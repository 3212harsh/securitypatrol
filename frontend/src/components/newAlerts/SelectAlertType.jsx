import React from 'react';
import { useNavigate } from 'react-router-dom';
import pointer from '../../assets/pointer.svg';

const SelectAlertType = ({ title, description, image, route }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col gap-5 cursor-pointer"
      onClick={() => navigate(route)} // Navigate on click
    >
      {/* Background Image Div */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(${image})`,
          zIndex: -1,
          opacity: 0.2,
        }}
      ></div>

      {/* Header */}
      <div className="flex items-center gap-2">
        <img src={pointer} className="w-7 h-7" alt="Icon" />
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col gap-8 w-[70vh] h-[50vh] hover:bg-gray-800 justify-center items-center border border-gray-800 rounded-3xl hover:shadow-lg transition-shadow duration-300">
        <img src={image} className="w-32 h-32" alt="Icon" />
        <h1 className="text-lg font-medium">{description}</h1>
      </div>
    </div>
  );
};

export default SelectAlertType;
