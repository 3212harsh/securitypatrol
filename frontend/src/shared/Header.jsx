import React, { useState, useRef, useEffect } from 'react';
import vault from '../assets/vault.svg';
import vaultFilled from '../assets/filled-vault.svg'; // Import the filled version of the vault image
import notification from '../assets/notification.svg';

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if credentials are submitted
  const popupRef = useRef(null); // Ref for the popup container

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false); // Close the popup
      }
    };

    // Add event listener when the popup is open
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts or the popup closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]); // Re-run the effect when `isPopupOpen` changes

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitted(true); // Mark credentials as submitted
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className='relative'>
      {/* Header */}
      <div className='flex justify-between px-4 w-full min-h-14 items-center border-b border-gray-300'>
        <h1 className='text-md font-bold tracking-wide text-gray-400 border-r-2 px-2 border-gray-300'>/ Dashboard</h1>
        <div className='flex gap-10 items-center'>
          <div className='flex gap-3 items-center'>
            <img 
              src={isSubmitted ? vaultFilled : vault} // Change image based on submission state
              className='w-12 h-12 rounded-md cursor-pointer p-2 hover:border hover:border-zinc-300' 
              onClick={togglePopup} 
            />
            <img src={notification} className='w-12 h-12 rounded-md cursor-pointer p-2 hover:border hover:border-zinc-300' />
          </div>
          <div className='flex items-center gap-3'>
            <p className='text-xl font-semibold text-gray-300'>Harsh075</p>
            <img 
              src="https://i.pravatar.cc/150?img=3" 
              alt="Profile" 
              className='w-10 h-10 rounded-full border border-gray-300 shadow-md'
            />
          </div>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center'>
          {/* Blur Background with Transition */}
          <div className='absolute inset-0 backdrop-blur-sm transition-opacity duration-300'></div>
          
          {/* Popup Content with Transition */}
          <div 
            ref={popupRef} 
            className='relative bg-gray-900 p-8 rounded-lg shadow-lg w-[80vh] border border-gray-700 transform transition-all duration-300 ease-in-out scale-95 opacity-0'
            style={{ transform: 'scale(1)', opacity: 1 }} // Apply final state for transition
          >
            <div className='flex justify-between items-center mb-2'>
              <h2 className='text-lg font-semibold mb-6 text-gray-200'>Enter AWS Credentials</h2>
              <button 
                onClick={togglePopup} 
                className='px-5 py-2.5  text-white rounded-lg mr-3 hover:bg-red-700 transition-colors duration-200'
              >
                Cancel
              </button>
            </div>
            
            {/* Access Key Input */}
            <div className='mb-5'>
              <label className='block text-sm font-medium text-gray-400 mb-2'>Access Key</label>
              <input 
                type='text' 
                placeholder='Enter your access key' 
                className='w-full p-3 border border-gray-700 rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
              />
            </div>

            {/* Secret Key Input */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-400 mb-2'>Secret Key</label>
              <input 
                type='password' 
                placeholder='Enter your secret key' 
                className='w-full p-3 border border-gray-700 rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
              />
            </div>

            {/* Buttons */}
            <div className='flex justify-end'>
              <button 
                onClick={handleSubmit} // Handle form submission
                className='px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;