import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Panel from '../components/simulatorComponents/Panel';
import Header from '../components/simulatorComponents/Header';
import Popup from '../components/Popup';
import Form from '../components/Form';
import FlowSim from '../components/simulatorComponents/FlowSim';
import { toast } from 'sonner';
import axios from "axios"

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
  const handleTupleContentPopupOpen = async () => {

    // const sections = [
    //   { title: "States", content: "State content here" },
    //   { title: "Input", content: "Input content here" },
    //   { title: "Initial States", content: "Initial States content here" },
    //   { title: "Final States", content: "Final States content here" }
    // ];

    // let states = []
    // let alphabet = []
    // let initialState = null
    // let acceptStates = []

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
