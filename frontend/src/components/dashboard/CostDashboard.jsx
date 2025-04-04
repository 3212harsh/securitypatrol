import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AwsCostWidget = () => {
  // State to hold cost data
  const [currentCost, setCurrentCost] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [budget, setBudget] = useState(2000); // Default budget value

  // Calculate the percentage of the current cost relative to the budget
  const costPercentage = (currentCost / budget) * 100;

  // Reference for the chart canvas
  const chartRef = useRef(null);

  // Fetch AWS cost data when the component mounts
  useEffect(() => {
    const fetchAwsCostData = async () => {
      try {
        const response = await fetch('http://localhost:3000/aws-cost'); // Replace with your backend URL
        const data = await response.json();
        setCurrentCost(data.currentCost);
        setEstimatedCost(data.estimatedCost);
        setBudget(data.budget);
      } catch (error) {
        console.error('Error fetching AWS cost data:', error);
      }
    };

    fetchAwsCostData();
  }, []);

  // Chart data for the semi-circle speedometer
  const data = {
    labels: ['Current Cost', 'Remaining Budget'],
    datasets: [
      {
        data: [currentCost, budget - currentCost],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null; // Ensure chart area is available

          // Create a gradient that spans the entire chart
          const gradient = ctx.createLinearGradient(
            chartArea.left, // Start from the left
            0,
            chartArea.right, // End at the right
            0
          );
          gradient.addColorStop(0, '#00FF00'); // Green at the leftmost side
          gradient.addColorStop(1, '#FF0000'); // Red at the rightmost side

          return [gradient, '#4A5568']; // Gradient for current cost, gray for remaining
        },
        borderWidth: 0,
      },
    ],
  };

  // Chart options to create a semi-circle effect
  const options = {
    rotation: -90, // Start from the left (12 o'clock position)
    circumference: 180, // Half circle (180 degrees)
    cutout: '70%', // Adjust the size of the hole in the middle
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  return (
    <div className="w-full h-fit p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">AWS Cost Overview</h2>
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold">${currentCost}</p>
          <p className="text-gray-400 text-sm">Current Cost</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">${estimatedCost}</p>
          <p className="text-gray-400 text-sm">Estimated Cost</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">${budget}</p>
          <p className="text-gray-400 text-sm">Budget</p>
        </div>
      </div>
      {/* Wider chart container */}
      <div className="relative h-32 flex items-center justify-center">
        <div className="w-64 h-32"> {/* Wider base (w-64) with same height (h-32) */}
          <Doughnut ref={chartRef} data={data} options={options} />
        </div>
        <div className="absolute bottom-1 text-center">
          <p className="text-2xl font-bold text-white">{costPercentage.toFixed(1)}%</p>
          <p className="text-sm text-gray-400">of budget used</p>
        </div>
      </div>
    </div>
  );
};

export default AwsCostWidget;
