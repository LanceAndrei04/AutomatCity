import React from 'react';
import { useNavigate } from 'react-router-dom';
import Flow from '../components/simulatorComponents/Flow';
import Panel from '../components/simulatorComponents/panel';

const Simulator = () => {
  const navigate = useNavigate();

  const handleButtonClick = (color) => {
    alert(`Button ${color} clicked!`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-white">Simulator Screen</h1>
        <button 
          onClick={() => navigate('/')} 
          className="border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white py-2 px-4 rounded transition-all duration-300"
        >
          Back to home screen
        </button>
      </header>
      
      <main className="flex flex-1">
        {/* Left Side: Panel Component */}
        <Panel onButtonClick={handleButtonClick} />

      
      </main>
    </div>
  );
};

export default Simulator;
