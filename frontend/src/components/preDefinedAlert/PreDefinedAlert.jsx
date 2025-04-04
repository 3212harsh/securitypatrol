import React, { useState } from "react";
import pointer from '../../assets/pointer.svg';
import { useNavigate } from "react-router-dom";

const PreDefinedAlert = () => {
  const navigate = useNavigate();
  const [alertName, setAlertName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Product");
  const [expandedDepartments, setExpandedDepartments] = useState({
    EC2: false,
    S3: false,
    Security: false,
  });

  const predefinedAlerts = {
    EC2: {
      High_CPU_Utilization: false,
      High_Low_Network_Inbound: false,
      High_Low_Network_Outbound: false,
    },
    S3: {
      Bucket_Policy_Changes_Alert: false,
      Unauthorized_Access_Alert: false,
      Track_Error_Rates_4xx_5xx: false,
    },
    Security: {
      Unauthorized_Access_Privilege_Escalation: false,
      IAM_User_with_Admin_Creation: false,
      Trail_Logs_Deletion: false,
      Disabling_Security_Services: false,
    },
  };

  const [alerts, setAlerts] = useState(predefinedAlerts);

  const toggleDepartment = (department) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

  const handleSaveAlert = async () => {
    if (!alertName) {
      alert("Please enter an alert name!");
      return;
    }
  
    const newAlert = {
      alert_name: alertName, // Ensure it matches the backend field name
      department: selectedDepartment,
      configurations: alerts, // Store alarm_config in configurations field
      status: false, // Set status as false (optional)
    };
  
    try {
      const response = await fetch("http://localhost:3000/new-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
        body: JSON.stringify(newAlert), // Convert to JSON
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Alert saved successfully!");
        console.log("Response from server:", data);
        setAlertName("");
        setSelectedDepartment("Product");
        setAlerts(predefinedAlerts);
        setExpandedDepartments({ EC2: false, S3: false, Security: false });
        navigate("/active-alerts");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error saving alert:", error);
      alert("Failed to save alert. Please try again.");
    }
  };
  
  
  const departmentOptions = ["Product", "Development", "Operations", "HR"];

  return (
    <div className="p-8 w-full mx-auto px-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-300">Create Predefined Alert</h2>
        <button
          onClick={handleSaveAlert}
          className="w-fit px-5 py-1 rounded-full border border-gray-300 text-gray-300 hover:border-gray-100 hover:text-gray-100 hover:bg-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Alert
        </button>
      </div>

      <div className="flex items-center gap-10 mb-4">
        <h1>Alert Name: </h1>
        <input
          type="text"
          placeholder="Enter Alert Name"
          value={alertName}
          onChange={(e) => setAlertName(e.target.value)}
          className="w-[50%] p-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-10 mb-6">
        <h1>Department: </h1>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-[50%] p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        >
          {departmentOptions.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-12 mb-6 justify-start">
        {Object.keys(predefinedAlerts).map((department) => (
          <div key={department} className="w-1/3">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-white text-lg">{department}</span>
              <label className="flex items-center space-x-2">
                <img
                  src={pointer}
                  alt="Pointer"
                  onClick={() => toggleDepartment(department)}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>
            </div>
            {expandedDepartments[department] && (
              <div className="space-y-4">
                {Object.keys(alerts[department]).map((alert) => (
                  <div key={alert} className="flex gap-4 items-center p-3 border border-gray-600">
                    <label className="flex items-center space-x-2">
                      <div
                        onClick={() => setAlerts({
                          ...alerts,
                          [department]: {
                            ...alerts[department],
                            [alert]: !alerts[department][alert],
                          },
                        })}
                        className={`w-5 h-5 rounded-full border-2 border-gray-600 ${
                          alerts[department][alert] ? "bg-green-500" : "bg-transparent"
                        } cursor-pointer`}
                      ></div>
                      <span className="text-sm text-gray-300">{alert.replace(/_/g, " ")}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreDefinedAlert;