import React from 'react';
import Utilization_Matrix from '../components/dashboard/Utilization_Matrix';
import ResourceInfo from '../components/dashboard/ResourceInfo';

const Dashboard = () => {
  return (
    <div className='p-4 '>

      <Utilization_Matrix/>
      <ResourceInfo/>
      {/* <ActiveAlerts/> */}
    </div>
  );
};

export default Dashboard;
