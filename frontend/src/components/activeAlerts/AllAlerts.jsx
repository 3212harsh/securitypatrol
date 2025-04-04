import React, { useEffect, useState } from 'react'; 

const getStatusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'border border-red-500 text-red-400 px-3 py-1 rounded-full text-sm font-medium bg-red-800';
    case 'Acknowledged':
      return 'border border-yellow-500 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium bg-yellow-800';
    case 'Resolved':
      return 'border border-green-500 text-green-400 px-3 py-1 rounded-full text-sm font-medium bg-green-800';
    default:
      return 'text-gray-400';
  }
};

// Function to format timestamp in 'YYYY-MM-DD HH:mm UTC' format
const formatTimestamp = (isoString) => {
  if (!isoString) return 'N/A';
  
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Ensure 2 digits
  const day = String(date.getUTCDate()).padStart(2, '0'); 
  const hours = String(date.getUTCHours()).padStart(2, '0'); 
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
};

const AllAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/alerts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Alerts:', data); // Log fetched alerts
        setAlerts(data);
      })
      .catch((error) => console.error('Error fetching alerts:', error));
  }, []);

  return (
    <div className='p-2 w-full flex flex-col mt-10 bg-gray-900 min-h-screen'>
      <h1 className='text-xl font-semibold text-gray-200 mb-6 tracking-wide'>
        Active Alerts
      </h1>

      <div className='w-full shadow-lg rounded-lg overflow-hidden border border-gray-700'>
        <table className='w-full text-left border-collapse'>
          <thead className='bg-gray-800 text-gray-300 uppercase text-sm font-semibold'>
            <tr>
              <th className='px-6 py-3'>Alert Name</th>
              <th className='px-6 py-3'>Service</th>
              <th className='px-6 py-3'>Region</th>
              <th className='px-6 py-3'>Timestamp</th>
              <th className='px-6 py-3'>Status</th>
            </tr>
          </thead>

          <tbody className='text-gray-300 text-sm'>
            {alerts.map((alert, index) => (
              <tr
                key={alert._id}
                className={`border-b border-gray-700 transition-all duration-300 hover:bg-gray-700 cursor-pointer ${
                  index % 2 === 0 ? 'bg-gray-850' : 'bg-gray-800'
                }`}
              >
                <td className='px-6 py-4 font-medium'>{alert.alert_name}</td>
                <td className='px-6 py-4'>{alert.department}</td>
                <td className='px-6 py-4'>{alert.region || 'ap-south-1'}</td>
                <td className='px-6 py-4'>{formatTimestamp(alert.createdAt)}</td>
                <td className='px-6 py-4'>
                  <span className={getStatusClass(alert.status ? 'Active' : 'Resolved')}>
                    {alert.status ? 'Active' : 'Apply'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAlerts;
