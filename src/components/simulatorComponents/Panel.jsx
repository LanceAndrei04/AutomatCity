import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TestCase from './TestCase';
import ToggleSwitch from './ToggleSwitch';
import TupleGenerator from './TupleGenerator';
import Popup from '../Popup';
import { toast } from 'sonner'; // Importing sonner toast

const Panel = ({ onTupleButtonClick, isDfa, setIsDfa, nodes, edges }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [testPath, setTestPath] = useState(null);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  // Toggle DFA/NFA and show a toast message
  const handleToggle = (newValue) => {
    setIsDfa(newValue); // Update the state with the new value (true or false)
    toast(`${newValue ? 'DFA' : 'NFA'} selected`, {
      style: {
        backgroundColor: '#22c55e',
        color: 'white',
      },
    });
  };
  

  return (
    <div className="relative">
      <button
        className="lg:hidden fixed top-4 left-9 z-30 my-2"
        onClick={togglePanel}
      >
        <FontAwesomeIcon icon={faBars} size="2x" className="text-gray-700" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full p-4 md:p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out z-20 transform ${
          isPanelVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:block w-full sm:w-1/2 md:w-1/4 lg:w-1/4 ${
          isPanelVisible ? 'w-full sm:w-1/2 md:w-1/4' : 'w-0'
        } overflow-auto`}
      >
        <div className="text-center text-blue-500 text-2xl font-bold mb-4 mt-4">
          ToolKit
        </div>

        <div className="flex justify-center neumorphic-btn mb-4">
          {/* Pass isDfa and setIsDfa to the ToggleSwitch component */}
          <ToggleSwitch isChecked={isDfa} onChange={handleToggle} />
        </div>

        {/* State Types Legend */}
        <div className="bg-white rounded-lg p-2 mb-2 shadow-md">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">State Types</h3>
          <div className="flex justify-between items-center gap-x-1 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
              <span className="text-gray-600">Initial</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
              <span className="text-gray-600">Final</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
              <span className="text-gray-600">Trap</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-[#FACC15]"></div>
              <span className="text-gray-600">Regular</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <TestCase nodes={nodes} edges={edges} isDfa={isDfa} onTestPath={setTestPath} testPath={testPath}/>
        </div>

        <div className="mb-4 mt-4">
          <TupleGenerator onButtonClick={onTupleButtonClick} />
        </div>
      </div>

      {isPanelVisible && (
        <div
          className="fixed inset-0 bg-gray-600 opacity-50 z-10"
          onClick={togglePanel}
        ></div>
      )}

      {isPopupVisible && (
        <Popup
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          onSave={handleAddNode}
          nodeData={nodeData}
          popupType="nodeName"
        />
      )}
    </div>
  );
};

export default Panel;
