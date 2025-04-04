const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");  // Import CORS package
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { EC2Client, DescribeRegionsCommand, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");
const { CostExplorerClient, GetCostAndUsageCommand } = require('@aws-sdk/client-cost-explorer');
const Alertmodel = require('./database/alerts')

dotenv.config(); // Load AWS credentials from .env

const app = express();
const port = 3000;

app.use(express.json()); // This enables JSON parsing
app.use(express.urlencoded({ extended: true })); // For URL-encoded data (optional)

// Enable CORS for all origins (you can limit this for production)
app.use(cors());

// AWS Credentials and Configuration
const REGION = "us-east-1"; // Default region
const ec2Client = new EC2Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const s3Client = new S3Client({
   region: REGION,
   credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
   },
   });

// Function to get all AWS regions
async function getAWSRegions() {
  try {
    const command = new DescribeRegionsCommand({});
    const response = await ec2Client.send(command);
    return response.Regions.map((region) => region.RegionName);
  } catch (error) {
    console.error("Error fetching AWS regions:", error);
    return [];
  }
}

// Cost Explorer Client
const costExplorerClient = new CostExplorerClient({
    region: "us-east-1", // Cost Explorer is available in this region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

const generateUniqueAlertId = async () => {
  const lastAlert = await Alertmodel.findOne().sort({ alert_id: -1 }); // Get the latest alert
  return lastAlert ? lastAlert.alert_id + 1 : 1; // If no alerts exist, start from 1
};

// Function to get EC2 instances by state in a region
async function getInstances(region, states) {
  try {
    const client = new EC2Client({ region, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY } });
    const command = new DescribeInstancesCommand({
      Filters: [{ Name: "instance-state-name", Values: states }],
    });
    const response = await client.send(command);

    // Extract details from the response and include region
    const instances = response.Reservations.flatMap((reservation) =>
      reservation.Instances.map((instance) => ({
        id: instance.InstanceId,
        status: instance.State.Name.toLowerCase(),
        type: instance.InstanceType,
        region: region, // Add region here
      }))
    );

    return instances;
  } catch (error) {
    console.error(`Error fetching instances in ${region}:`, error);
    return [];
  }
}

async function getAWSCostData() {
try {
    const command = new GetCostAndUsageCommand({
    TimePeriod: {
        Start: "2025-01-01", // Start date (you can adjust as needed)
        End: "2025-02-01", // End date (you can adjust as needed)
    },
    Granularity: "MONTHLY", // Granularity for monthly costs
    Metrics: ["UnblendedCost"], // Unblended cost (you can adjust if you need others)
    });
    
    const response = await costExplorerClient.send(command);

    // Extract the necessary values from the response
    const currentCost = parseFloat(response.ResultsByTime[0].Total.UnblendedCost.Amount);
    const estimatedCost = currentCost * 1.25; // Placeholder for estimated cost (you can adjust this logic)
    const budget = 2000; // Hardcoded budget (you can modify as per your requirements)

    return { currentCost, estimatedCost, budget };
} catch (error) {
    console.error("Error fetching AWS cost data:", error);
    throw new Error("Failed to fetch AWS cost data");
}
}

// API route to get S3 bucket data
async function listAllObjects(bucketName) {
  let contents = [];
  let continuationToken = undefined;

  try {
    do {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        ContinuationToken: continuationToken,
      });

      const response = await s3Client.send(command);

      if (response.Contents) {
        contents.push(...response.Contents);
      }

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } while (continuationToken);

    return contents
      .filter((obj) => obj.Key.endsWith(".tfstate") || obj.Key.endsWith(".tfvars"))
      .map((obj) => ({
        key: obj.Key.endsWith(".tfvars") ? obj.Key.replace(".tfvars", ".tfstate") : obj.Key,
        bucket: bucketName,
        size: obj.Size,
        lastModified: obj.LastModified.toISOString(),
      }));
  } catch (err) {
    console.error(`Error listing objects from ${bucketName}:`, err);
    throw err;
  }
}

// API route to get AWS cost data for the widget
app.get("/aws-cost", async (req, res) => {
try {
    const { currentCost, estimatedCost, budget } = await getAWSCostData();
    res.json({ currentCost, estimatedCost, budget });
} catch (error) {
    console.error("Error fetching cost data:", error);
    res.status(500).json({ error: "Failed to fetch cost data" });
}
});

// API route to list all instances (running, stopped, terminated) across all regions as a flat array
app.get("/instances", async (req, res) => {
  try {
    const regions = await getAWSRegions();
    if (!regions.length) {
      return res.status(500).json({ error: "Failed to fetch AWS regions." });
    }

    // Define the instance states you want to include
    const instanceStates = ["running", "stopped", "terminated"];

    // Get all instances across regions and flatten the array
    const results = await Promise.all(regions.map((region) => getInstances(region, instanceStates)));
    const allInstances = results.flat(); // Flatten the array to get a single list of instances
    res.json(allInstances);
  } catch (error) {
    console.error("Error fetching instances:", error);
    res.status(500).json({ error: "Failed to list instances." });
  }
});

app.get("/alerts", async (req, res) => {
  try {
    const bucketA = "sp-users-requests";     // Alerts bucket
    const bucketB = "sp-terraform-state-file"; // State files bucket

    const [filesA, filesB] = await Promise.all([
      listAllObjects(bucketA),
      listAllObjects(bucketB),
    ]);

    // Create sets for fast lookup
    const keysA = new Set(filesA.map(f => f.key));
    const keysB = new Set(filesB.map(f => f.key));

    // Combine all keys
    const allKeys = new Set([...keysA, ...keysB]);

    const result = [];

    for (const key of allKeys) {
      const inA = keysA.has(key);
      const inB = keysB.has(key);

      result.push({
        key,
        active: inA && inB,
        inBucketA: inA,
        inBucketB: inB,
        sourceBucket: inA ? bucketA : bucketB
      });
    }
    console.log("Alerts:", result);
    
    res.status(200).json({ alerts: result });
  } catch (error) {
    console.error("Error comparing S3 buckets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/new-alert", async (req, res) => {
  try {
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty or invalid" });
    }

    const { alert_name, department, configurations } = req.body;

    if (!alert_name || !department || !configurations) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Generate a unique alert_id
    const alert_id = await generateUniqueAlertId();

    // Create and save the new alert
    const newAlert = new Alertmodel({
      alert_id,
      alert_name,
      department,
      configurations,
      status: false, // Set default status as false
    });

    await newAlert.save();

    res.status(201).json({ message: "New alert created successfully", alert: newAlert });

  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
