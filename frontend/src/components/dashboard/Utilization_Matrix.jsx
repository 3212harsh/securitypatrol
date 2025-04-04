import React from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, BarElement, Tooltip, Legend);

const cpuData = {
  labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
  datasets: [
    {
      label: 'CPU Usage (%)',
      data: [20, 45, 30, 55, 40, 70],
      borderColor: '#FACC15',  // Bright Yellow for visibility
      backgroundColor: 'rgba(250, 204, 21, 0.2)',  
      pointBorderColor: '#FACC15',
      pointBackgroundColor: '#FACC15',
      tension: 0.3,  // Smooth curve effect
      fill: true,
    },
  ],
};

const memoryData = {
  labels: ['Used Memory', 'Available Memory'],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ['#F87171', '#1E293B'],  // Red & Dark Gray
      hoverBackgroundColor: ['#DC2626', '#334155'],
      borderWidth: 1,
    },
  ],
};

const diskData = {
  labels: ['EBS-Vol1', 'EBS-Vol2', 'EBS-Vol3'],
  datasets: [
    {
      label: 'Disk Usage (GB)',
      data: [150, 300, 200],
      backgroundColor: ['#60A5FA', '#34D399', '#A78BFA'],  // Blue, Green, Purple
      borderColor: ['#3B82F6', '#059669', '#7C3AED'],
      borderWidth: 2,
    },
  ],
};

// Chart styling options for dark mode
const darkThemeOptions = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      titleColor: '#E5E7EB',
      bodyColor: '#E5E7EB',
    },
  },
  scales: {
    x: {
      ticks: { color: '#E5E7EB' },  // X-axis labels
      grid: { color: '#4B5563' },  // **Updated Grid Line Color**
    },
    y: {
      ticks: { color: '#E5E7EB' },  // Y-axis labels
      grid: { color: '#4B5563' },  // **Updated Grid Line Color**
    },
  },
};

const memoryChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout:'0%'
};

const Utilization_Matrix = () => {
  return (
    <>
      <h1 className='text-xl font-semibold text-gray-200 mb-4'>AWS Cloud Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>

        {/* CPU Usage Chart */}
        <div className='bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center h-80'>
          <h2 className='text-lg font-semibold text-gray-300 mb-4'>CPU Usage</h2>
          <div className='w-full h-full flex items-center justify-center'>
            <Line data={cpuData} options={darkThemeOptions} />
          </div>
        </div>

        {/* Memory Usage Chart */}
        <div className='bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center h-80'>
          <h2 className='text-lg font-semibold text-gray-300 mb-4'>Memory Usage</h2>
          <div className='flex items-center justify-center' style={{ width: '80%', height: '80%' }}>
            <Doughnut data={memoryData} options={memoryChartOptions} />
          </div>
        </div>

        {/* Disk Usage Chart */}
        <div className='bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center h-80'>
          <h2 className='text-lg font-semibold text-gray-300 mb-4'>Disk Usage</h2>
          <div className='w-full h-full flex items-center justify-center'>
            <Bar data={diskData} options={darkThemeOptions} />
          </div>
        </div>

      </div>
    </>
  );
};

export default Utilization_Matrix;
