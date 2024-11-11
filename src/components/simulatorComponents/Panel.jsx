import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TestCase from './TestCase';
import ToggleSwitch from './ToggleSwitch';
import CircleButton from '../CircleButton';
import TupleGenerator from './TupleGenerator';
import MessageBox from './MessageBox';


const Panel = ({ onButtonClick, addNode }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null); // To track the selected button color

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };



  return (
    <div className="relative">
      {/* Toggle Button (only visible on small screens) */}
      <button
        className="lg:hidden fixed top-4 left-9 z-20 my-2"
        onClick={togglePanel}
      >
        <FontAwesomeIcon icon={faBars} size="2x" className="text-gray-700" />
      </button>

      {/* Side Panel */}
      <div
        className={`fixed top-0 left-0 h-full p-4 md:p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out z-10 transform ${
          isPanelVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:block w-full sm:w-1/2 md:w-1/4 lg:w-1/4 ${
          isPanelVisible ? 'w-full sm:w-1/2 md:w-1/4' : 'w-0'
        } overflow-auto`}
      >
        {/* Panel Title */}
        <div className="text-center text-blue-500 text-2xl font-bold mb-4 mt-4">
          ToolKit
        </div>
        

        {/* Circle Buttons with onClick handler */}
        <div className="flex justify-between mb-6 neumorphic-container">
          <CircleButton color="bg-green-500" title="Initial State"  />
          <CircleButton color="bg-yellow-500" title="State"  />
          <CircleButton color="bg-red-500" title="Trap State"  />
          <CircleButton color="bg-blue-500" title="Final State" />
        </div>

        {/* Additional components */}
        <div className="mb-4">
          <TestCase />
        </div>

        <div className="mb-4 mt-4">
          <TupleGenerator onButtonClick={onButtonClick} />
        </div>
      </div>

      {/* Overlay when panel is visible on smaller screens */}
      {isPanelVisible && (
        <div
          className="fixed inset-0 bg-gray-600 opacity-50 z-5"
          onClick={togglePanel} // Clicking on overlay will close the panel
        ></div>
      )}
    </div>
  );
};

export default Panel;
