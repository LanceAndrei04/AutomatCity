// NodePopup.js
import React, { useState } from 'react';
import { toast } from 'sonner';

const NodePopup = ({ nodeState, onAddNode, onClose }) => {
  const [label, setLabel] = useState('');

  // Handle input change to update the label state
  const handleInputChange = (e) => {
    setLabel(e.target.value);
  };

  // Handle the adding of a node when "Add Node" is clicked
  const handleAddNode = () => {
    if (!label) {
        toast.error('Node name cannot be empty!', {
            style: { backgroundColor: '#ef4444', color: 'white' }, 
          });
        } else {
            toast.success(`State ${label} added!`, {
                style: { backgroundColor: '#22c55e', color: 'white' }, 
              });        
      // Call the onAddNode function passed from the parent with state and label
      onAddNode({ state: nodeState, label });
      onClose(); // Close the popup after adding the node
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
      {/* Popup content */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-full md:max-w-lg w-full m-16 my-16">
        {/* Close Button placed at the top-right corner */}
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-xl text-gray-700">
            &#10005; {/* Close Icon */}
          </button>
        </div>
        
        <div>
        <h2 className="text-2xl font-bold text-center mb-4 capitalize">{nodeState} State </h2>

          
          {/* Input for node name */}
          <input
            type="text"
            value={label} // Bind the value to the label state
            onChange={handleInputChange} // Update label on change
            className="border border-gray-300 p-2 rounded w-full mb-4"
            placeholder="Enter node name"
          />
          
          {/* Button to add node */}
          <div className="flex justify-end">
            <button
              onClick={handleAddNode} // Use handleAddNode function on click
              className="btn btn-primary px-8 py-2 text-white bg-blue-400 hover:bg-blue-600 rounded-lg"
            >
              Add Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodePopup;
