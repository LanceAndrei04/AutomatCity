import React from 'react';

const CustomNode = ({ name, color }) => {
  return (
    <div
      className={`w-20 h-20 flex items-center justify-center rounded-full ${color} shadow-lg neumorphic-btn mb-4`}
    >
      <span className="text-white text-sm">{name}</span>
    </div>
  );
};

export default CustomNode;
