import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import securityIcon from '../assets/security.svg'; 
import dashboard from '../assets/dashboard.svg';
import active_alerts from '../assets/active-alerts.svg';
import custom_alerts from '../assets/custom-alerts.svg';
import new_alerts from '../assets/new-alerts.svg';
import accounts from '../assets/accounts.svg';
import settings from '../assets/settings.svg';

const menuItems = [
  { name: 'Dashboard', icon: dashboard, path: '/' },
  { name: 'Active Alerts', icon: active_alerts, path: '/active-alerts' },
  { name: 'New Alerts', icon: new_alerts, path: '/new-alerts' },
  { name: 'Custom Alerts', icon: custom_alerts, path: '/custom-alerts' },
  { name: 'Accounts', icon: accounts, path: '/accounts' },
  { name: 'Settings', icon: settings, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='h-screen w-64 text-white flex flex-col p-3 transition-all duration-300 ease-in-out'>
      <div className='flex flex-col w-full h-full bg-gray-800 shadow-xl rounded-2xl'>
        
        {/* Sidebar Header */}
        <div className='flex items-center justify-center gap-3 h-28 px-4 border-b border-gray-700 shadow-md'>
          <img src={securityIcon} alt='Security' className='w-14 h-14' />
          <div className='flex flex-col text-gray-300 text-2xl leading-tight' 
               style={{ fontFamily: `'Orbitron', 'Rajdhani', sans-serif'`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>S3cur1ty</span>
            <span>P4trol</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className='flex-1 px-3 py-5 space-y-3'>
          {menuItems.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 p-3 text-lg rounded-lg cursor-pointer font-semibold transition-all duration-300 
                hover:bg-gray-700 hover:shadow-lg hover:scale-105 transform 
                ${location.pathname === item.path ? 'bg-gray-700' : 'bg-transparent'}`}
              style={{ animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s both` }}
            >
              <img src={item.icon} alt={item.name} className='w-6 h-6' />
              <span className='tracking-wide text-sm text-gray-300'>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className='mt-auto p-4 text-sm text-gray-500 opacity-80 text-center'>
          <p>© 2024 YourApp</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
