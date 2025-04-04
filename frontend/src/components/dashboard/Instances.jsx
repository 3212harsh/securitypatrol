import React, { useEffect, useState } from "react";
import instance_icon from '../../assets/instance.svg';

const AwsInstancesList = () => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const response = await fetch("http://localhost:3000/instances");
        const data = await response.json();
        console.log("instance data  = ", data);
        setInstances(data);
      } catch (error) {
        console.error("Error fetching instances:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstances();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "running":
        return "text-green-400 bg-green-900";
      case "stopped":
        return "text-red-400 bg-red-900";
      case "pending":
        return "text-yellow-400 bg-yellow-900";
      case "terminated":
        return "text-gray-400 bg-gray-800";
      default:
        return "text-gray-300 bg-gray-700";
    }
  };

  return (
    <div className="w-full h-fit mx-auto shadow-xl rounded-md flex p-3 items-center justify-center bg-gray-800">
      <div className="w-full rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 mb-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={instance_icon} alt="Instance Icon" className="w-5 h-5 object-contain" />
              <h2 className="text-lg text-gray-200 font-semibold tracking-wide">Instances Running</h2>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="w-full h-48 bg-gray-700 animate-pulse rounded-lg"></div>
        ) : (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="w-full rounded-lg">
              <thead>
                <tr className="text-xs text-gray-300 bg-gray-900 uppercase">
                  <th className="px-6 py-2 text-left">Instance ID</th>
                  <th className="px-6 py-2 text-left">Status</th>
                  <th className="px-6 py-2 text-left">Instance Type</th>
                  <th className="px-6 py-2 text-left">Region</th>
                </tr>
              </thead>
              <tbody>
                {instances.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-22 text-center text-gray-400 text-md">
                      No instances are Avaliabe in your account
                    </td>
                  </tr>
                ) : (
                  instances.map((instance, index) => (
                    <tr
                      key={instance.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-600 transition-all duration-200`}
                    >
                      <td className="px-6 py-4 font-mono text-gray-300 text-sm">{instance.id}</td>
                      <td className="px-6 py-4 text-sm text-left capitalize tracking-wide">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(instance.status)}`}>
                          {instance.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{instance.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{instance.region}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwsInstancesList;
