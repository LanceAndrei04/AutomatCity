import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flow from '../components/simulatorComponents/Flow';
import Panel from '../components/simulatorComponents/panel';
import Header from '../components/simulatorComponents/Header';
import Popup from '../components/Popup';
import { sections, tableData } from '../components/contents';
import Form from '../components/Form';
import FlowSim from '../components/simulatorComponents/FlowSim';
import { toast } from 'sonner';

const Simulator = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null); // Data for the popup (either node name or dynamic content)
  const [popupType, setPopupType] = useState(null); // Type of the popup (either "nodeName" or "tupleContent")
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility
  const navigate = useNavigate();
  const [isDfa, setIsDfa] = useState(true);

  // Function to show popup for entering node name
  const handleNodeNamePopupOpen = (node) => {
    setPopupType('nodeName'); // Set the popup type to 'nodeName'
    setPopupData(node); // Pass the node data to the popup
    setIsPopupVisible(true);
  };

  // Function to show popup for tuple generator content
  const handleTupleContentPopupOpen = () => {
    setPopupType('tupleContent'); // Set the popup type to 'tupleContent'
    setPopupData({ sections, tableData }); // Pass the dynamic content to the popup
    setIsPopupVisible(true);
  };

  // Function to hide the popup
  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setPopupData(null); // Clear the popup data
    setPopupType(null); // Clear the popup type
  };

  // Function to open the form when account button is clicked
  const handleAccountClick = () => {
    setIsFormVisible(true); // Corrected state variable name here
  };

  const handleGetNodes = (newNodes) => {
    setNodes(prevEdges => newNodes)
  }

  const handleGetEdges = (newEdges) => {
    toast.success("EDGES CHANGED")
    setEdges(prevEdges => newEdges)
  }

  return (
    <div className="flex h-screen">
      {/* Left-side Panel */}
      <div className="w-1/4 py-2 px-4">
        <Panel 
          onTupleButtonClick={handleTupleContentPopupOpen} 
          isDfa={isDfa}
          setIsDfa={setIsDfa}
          nodes={nodes}
          edges={edges}
        />
      </div>

      {/* Right-side main layout */}
      <div className="flex flex-col flex-1 h-full p-4 bg-white border-gray-300">
        {/* Header at the top */}
        <div className="w-full bg-gray-200 shadow-md">
          <Header onAccountClick={handleAccountClick} /> {/* Pass function here */}
        </div>

        {/* Flow component taking the remaining space */}
        <div className="flex-1 bg-gray-100 overflow-auto p-2">
          <FlowSim isDfa={isDfa} onGetEdges={handleGetEdges} onGetNodes={handleGetNodes}/>
        </div>
      </div>

      {/* Popup Component - Shows when isPopupVisible is true */}
      <Popup
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        popupType={popupType}
        data={popupData}
      />

      
      
      {/* Form Modal - Show the form when isFormVisible is true */}
      {isFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className=" p-8 rounded-lg  w-96">
            <Form onClose={() => setIsFormVisible(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulator;
