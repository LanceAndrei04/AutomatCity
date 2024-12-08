import React, { useState } from 'react';
import { toast } from 'sonner';

const Popup = ({ isVisible, onClose, popupType, data, addNode, nodeData}) => {
  const [nodeName, setNodeName] = useState('');

  if (!isVisible) return null;

  const handleInputChange = (e) => {
    setNodeName(e.target.value); 
  };

  const handleSubmit = () => {
    if (!nodeName.trim()) {
      // If the nodeName is empty or contains only spaces, show a warning toast
      toast.error('Node name cannot be empty!', {
        style: { backgroundColor: '#ed1c24', color: 'white' }, 
      });
    } else {
      // If the nodeName is valid, show a success toast
      toast.success(`Node ${nodeName} added!`, {
        style: { backgroundColor: '#34d399', color: 'white' }, 
      });
  
      // Use the addNode function to add the new node
      addNode({ 
        name: nodeName, 
        color: nodeData.color || 'bg-orange-500' 
      });
  
      onClose(); 
    }
  };

  // Render sections and table data in a structured layout
  const renderTupleContent = (sections, tableData) => {
    return (
      <div>
        {/* Render sections */}
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-bold mb-2">{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}

        {/* Render tableData */}
        <div>
          <h3 className="text-xl font-bold mb-2">{tableData.length > 0 ? "Table Data" : "No data available"}</h3>
          {tableData.length > 0 && (
            <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                {tableData[0].map((header, index) => (
                  <th key={index} className="border border-gray-300 p-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1).map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-300 p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
        {/* Popup content */}
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-full md:max-w-lg w-full m-16 my-16">
          {/* Close Button placed at the top-right corner */}
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-xl text-gray-700">
              &#10005; {/* Close Icon */}
            </button>
          </div>

          {/* Dynamic Content Based on popupType */}
          {popupType === 'nodeName' ? (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Enter Node Name</h2>
              <input
                type="text"
                value={nodeName}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full mb-4"
                placeholder="Enter node name"
              />
              <div className="flex justify-end">
                <button onClick={handleSubmit} className="btn btn-primary px-8 py-2 text-white bg-blue-400 hover:bg-blue-600 rounded-lg">
                    Add Node
                </button>
              </div>
            </div>
          ) : popupType === 'tupleContent' ? (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Tuple Content</h2>
              {/* Render sections and tableData dynamically */}
              {renderTupleContent(data.sections, data.tableData)}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Popup;
