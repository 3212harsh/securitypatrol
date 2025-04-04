// import React from 'react';

// const activeAlertsData = [
//   {
//     id: 1,
//     alertName: 'EC2 Instance Overload',
//     severity: 'Critical',
//     service: 'EC2',
//     region: 'us-east-1',
//     timestamp: '2024-02-10 12:45 UTC',
//     status: 'Active',
//   },
//   {
//     id: 2,
//     alertName: 'RDS High Latency',
//     severity: 'High',
//     service: 'RDS',
//     region: 'us-west-2',
//     timestamp: '2024-02-10 12:30 UTC',
//     status: 'Acknowledged',
//   },
//   {
//     id: 3,
//     alertName: 'S3 Bucket Public Access',
//     severity: 'Medium',
//     service: 'S3',
//     region: 'eu-central-1',
//     timestamp: '2024-02-10 12:15 UTC',
//     status: 'Resolved',
//   },
//   {
//     id: 4,
//     alertName: 'IAM Policy Change',
//     severity: 'Low',
//     service: 'IAM',
//     region: 'ap-south-1',
//     timestamp: '2024-02-10 12:00 UTC',
//     status: 'Active',
//   },
// ];

// const getSeverityClass = (severity) => {
//   switch (severity) {
//     case 'Critical':
//       return 'text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium';
//     case 'High':
//       return 'text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium';
//     case 'Medium':
//       return 'text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium';
//     case 'Low':
//       return 'text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium';
//     default:
//       return 'text-gray-600';
//   }
// };

// const getStatusClass = (status) => {
//   switch (status) {
//     case 'Active':
//       return 'border border-red-500 text-red-600 px-3 py-1 rounded-full text-sm font-medium bg-red-50';
//     case 'Acknowledged':
//       return 'border border-yellow-500 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium bg-yellow-50';
//     case 'Resolved':
//       return 'border border-green-500 text-green-600 px-3 py-1 rounded-full text-sm font-medium bg-green-50';
//     default:
//       return 'text-gray-600';
//   }
// };

// const ActiveAlerts = () => {
//   return (
//     <div className='p-2  flex flex-col'>
      
//       {/* Title */}
//       <h1 className='text-3xl font-bold text-gray-900 mb-6 tracking-wide'>
//         Active AWS Alerts
//       </h1>

//       {/* Table Container */}
//       <div className='w-full max-w-6xl shadow-lg rounded-lg overflow-hidden border border-gray-200'>
//         <table className='w-full text-left border-collapse'>

//           {/* Table Header */}
//           <thead className='bg-gray-100 text-gray-700 uppercase text-sm font-semibold'>
//             <tr>
//               <th className='px-6 py-3'>Alert Name</th>
//               <th className='px-6 py-3'>Severity</th>
//               <th className='px-6 py-3'>Service</th>
//               <th className='px-6 py-3'>Region</th>
//               <th className='px-6 py-3'>Timestamp</th>
//               <th className='px-6 py-3'>Status</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody className='text-gray-900 text-sm'>
//             {activeAlertsData.map((alert, index) => (
//               <tr
//                 key={alert.id}
//                 className={`border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 ${
//                   index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
//                 }`}
//               >
//                 <td className='px-6 py-4 font-medium'>{alert.alertName}</td>
//                 <td className='px-6 py-4'>
//                   <span className={getSeverityClass(alert.severity)}>{alert.severity}</span>
//                 </td>
//                 <td className='px-6 py-4'>{alert.service}</td>
//                 <td className='px-6 py-4'>{alert.region}</td>
//                 <td className='px-6 py-4'>{alert.timestamp}</td>
//                 <td className='px-6 py-4'>
//                   <span className={getStatusClass(alert.status)}>{alert.status}</span>
//                 </td> {/* Updated Status Column */}
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default ActiveAlerts;
