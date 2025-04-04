import React from 'react'
import ResourceInfo_Header from './ResourceInfo_Header'
import AwsInstancesList from './Instances'
import AwsCostWidget from './CostDashboard'

const ResourceInfo = () => {
  return (
    <div className='flex flex-col '>
      <div className='flex justify-between items-center'>
        <ResourceInfo_Header/>
      </div>
      <div className='flex gap-6'>
        <div className='flex w-[60%]'>
          <AwsInstancesList/>
        </div>
        <div  className='flex w-[40%]'>
          <AwsCostWidget/>
        </div>
      </div>
    </div>
  )
}

export default ResourceInfo
