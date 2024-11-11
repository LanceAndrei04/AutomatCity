import React from 'react';

const CircleButton = ({ color, onClick, title }) => {
  const baseColor = color.split('-')[1]; // Extract base color (e.g., 'blue' from 'blue-500')
  const hoverColor = `${baseColor}-900`;  // Create hover color by darkening

  return (
    <div className="relative group">
      <button
        className={`flex items-center justify-center w-12 h-12 rounded-full ${color} 
          border border-gray-200 neumorphic-btn transition duration-300 ease-in-out
          hover:shadow-xl focus:outline-none active:shadow-inner`}
        onClick={onClick}
        style={{ backgroundColor: color }}
        onMouseEnter={(e) => e.target.style.backgroundColor = hoverColor} 
        onMouseLeave={(e) => e.target.style.backgroundColor = color}
      >
        {/* You can add an icon or text here if needed */}
      </button>
      <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gray-500 w-full text-white text-sm rounded p-1">
        {title}
      </span>
    </div>
  );
};

export default CircleButton;
