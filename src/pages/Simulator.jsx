import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Panel from '../components/simulatorComponents/Panel';
import Header from '../components/simulatorComponents/Header';
import Popup from '../components/Popup';
import FlowSim from '../components/simulatorComponents/FlowSim';
import { toast } from 'sonner';
import axios from "axios"

const Simulator = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null); // Data for the popup 
  const [popupType, setPopupType] = useState(null); // Type of the popup 
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const navigate = useNavigate();
  const [isDfa, setIsDfa] = useState(true);

  // Show popup for entering node name
  const handleNodeNamePopupOpen = (node) => {
    setPopupType('nodeName'); 
    setPopupData(node); 
    setIsPopupVisible(true);
  };

  // Show popup for tuple generator content
  const handleTupleContentPopupOpen = async () => {

    const sections = []
    const tableData = []

    try {
      const response = await axios.get(
        `http://localhost:3000/automata/generateTuples`, {
        params: {
          nodes,
          edges,
        }
      })

      const {states, initialState, acceptStates, transitions, alphabet} = response.data

      let title = "States"
      let content = states.map(s => s[0]).join(", ");
      sections.push({title, content})

      title = "Alphabet"
      content = alphabet.filter(s => s !== "").join(", ");
      sections.push({title, content})

      title = "Initial State"
      content = initialState
      sections.push({title, content})

      title = "Accepting States"
      content = acceptStates.map(s => s[0]).join(", ")
      sections.push({title, content})

      //table data
      let row = ["STATE"]
      
      row = [...row, ...alphabet]
      tableData.push(row)

      for (const t of transitions) {
        // tableData.push(t)
        row = [t[0]]
        for (let i = 1; i < t.length; i++) {
          if (t[i].length > 0) {
            row.push(t[i].join(', '))
          }
          else {
            row.push('⌀')
          }
        }

        tableData.push(row)
        row = []

      }
    
    } catch (error) {
      console.error("error at generating tuples:", error)
    }


    setPopupType('tupleContent'); 
    setPopupData({ sections, tableData }); 
    setIsPopupVisible(true);
  };

  // Function to hide the popup
  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setPopupData(null); 
    setPopupType(null); 
  };


  const handleGetNodes = (newNodes) => {
    setNodes(prevEdges => newNodes)
  }

  const handleGetEdges = (newEdges) => {
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
        {/* Header*/}
        <div className="w-full bg-gray-200 shadow-md">
          <Header />
        </div>

        {/* Flow component */}
        <div className="flex-1 bg-gray-100 overflow-auto p-2">
          <FlowSim isDfa={isDfa} onGetEdges={handleGetEdges} onGetNodes={handleGetNodes}/>
        </div>
      </div>

      {/* Popup Component */}
      <Popup
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        popupType={popupType}
        data={popupData}
      />

    </div>
  );
};

export default Simulator;
