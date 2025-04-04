import React, { useEffect, useState } from 'react';

const getStatusClass = (active) => {
  return active
    ? 'bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium'
    : 'bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium';
};

const stripExtension = (filename) => {
  return filename.replace(/\.[^/.]+$/, '');
};

const AllAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/alerts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Alerts:', data);
        setAlerts(data.alerts || []);
      })
      .catch((error) => console.error('Error fetching alerts:', error));
  }, []);

  const handleDelete = async (key) => {
    try {
      const res = await fetch(`http://localhost:3000/alerts/${key}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAlerts((prev) => prev.filter((alert) => alert.key !== key));
        console.log(`Deleted alert with key: ${key}`);
      } else {
        console.error('Failed to delete alert');
      }
    } catch (err) {
      console.error('Error deleting alert:', err);
    }
  };

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
              <th className='px-6 py-3'>Actions</th>
            </tr>
          </thead>

          <tbody className='text-gray-300 text-sm'>
            {alerts.map((alert, index) => (
              <tr
                key={`${alert.key}-${index}`}
                className={`border-b border-gray-700 transition-all duration-300 hover:bg-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-850' : 'bg-gray-800'
                }`}
              >
                <td className='px-6 py-4 font-medium'>
                  {stripExtension(alert.key)}
                </td>
                <td className='px-6 py-4'>Terraform</td>
                <td className='px-6 py-4'>us-east-1</td>
                <td className='px-6 py-4'>2025-04-04 12:00 UTC</td>
                <td className='px-6 py-4'>
                  <span className={getStatusClass(alert.active)}>
                    {alert.active ? 'Active' : 'Apply'}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => handleDelete(alert.key)}
                    className='text-red-400 hover:text-red-600 font-medium text-sm'
                  >
                    Delete Alert
                  </button>
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
