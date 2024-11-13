import React from 'react';

const CircleButton = ({ color, onClick, title, disabled}) => {
  return (
    <div className="relative group">
      <button
        className={`flex items-center justify-center w-12 h-12 rounded-full ${color} border border-gray-200 neumorphic-btn hover:shadow-lg transition duration-300 ease-in-out focus:outline-none active:shadow-inner`}
        onClick={onClick}
        disabled={disabled}
      />
      <span className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gray-500 text-white text-sm rounded p-1">
        {title}
      </span>
    </div>
  );
};

export default CircleButton;
