import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flow from '../components/simulatorComponents/Flow';
import Panel from '../components/simulatorComponents/panel';
import Header from '../components/simulatorComponents/Header';
import Popup from '../components/Popup';
import { sections, tableData } from '../components/contents';

const Simulator = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();

  // Function to show popup
  const handlePopupOpen = () => {
    setIsPopupVisible(true);
  };

  // Function to hide popup
  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  // Add a new node to the flow
  const addNode = (node) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      { id: `${node.name}-${prevNodes.length}`, ...node, position: { x: 100 + prevNodes.length * 150, y: 100 } }
    ]);
  };

  return (
    <div className="flex h-screen">
      {/* Left-side Panel */}
      <div className="w-1/4 py-2 px-4">
        <Panel onButtonClick={handlePopupOpen} addNode={addNode} />
      </div>

      {/* Right-side main layout */}
      <div className="flex flex-col flex-1 h-full p-4 bg-white border-gray-300">
        {/* Header at the top */}
        <div className="w-full bg-gray-200 shadow-md ">
          <Header />
        </div>

        {/* Flow component taking the remaining space */}
        <div className="flex-1 bg-gray-100 overflow-auto p-2">
          <Flow nodes={nodes} />
        </div>
      </div>

      {/* Popup Component - Shows when isPopupVisible is true */}
      <Popup
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        sections={sections}
        tableData={tableData}
      />
    </div>
  );
};

export default Simulator;
