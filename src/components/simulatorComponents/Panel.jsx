import React from 'react';
import TestCase from './TestCase';

const Panel = () => {
  return (
    <div className="w-1/5 h-full p-4 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center space-y-4">
      {/* Top Buttons: NFA and DFA */}
      <div className="flex w-full justify-around mb-4">
        <button className="w-20 h-10 bg-gray-200 rounded-lg shadow-md neumorphic-btn">
          NFA
        </button>
        <button className="w-20 h-10 bg-gray-200 rounded-lg shadow-md neumorphic-btn">
          DFA
        </button>
      </div>

      {/* Node Container: Box with 4 Neumorphic Buttons */}
      <div className="flex flex-wrap justify-center w-full mb-4 p-2 bg-blue border border-gray-300 rounded-lg">
        {['blue', 'green', 'purple', 'red'].map((color, index) => (
          <button
            key={index}
            className={`w-20 h-15 m-2 rounded-lg bg-${color}-500 neumorphic-btn`}
            onClick={() => alert(`Button ${index + 1} clicked!`)}
          />
        ))}
      </div>

      {/* Test Case Container inside Neumorphic Container */}
      <div className="w-full h-auto bg-white neumorphic-container p-4">
        <TestCase />
      </div>

      {/* Empty Box Container */}
      <div className="w-full h-32 bg-gray-100 neumorphic-container"></div>
    </div>
  );
};

export default Panel;
