import React from 'react'

const RegionSelect = () => {
  return (
    <div>
        <select
            id="region-select"
            className="mt-2 block w-full px-2 cursor-pointer text-gray-200 bg-gray-800 py-1 border border-gray-600 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="us-east-1">US East (N. Virginia)</option>
            <option value="us-west-1">US West (N. California)</option>
            <option value="us-west-2">US West (Oregon)</option>
            <option value="eu-west-1">EU West (Ireland)</option>
            <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
        </select>
    </div>
  )
}

export default RegionSelect
