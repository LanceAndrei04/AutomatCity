import React, { useState } from 'react';
import { toast } from 'sonner';

const EdgePopup = ({ edge, onUpdateEdgeLabel, onClose }) => {
  const [label, setLabel] = useState(edge?.label || ''); 

  const handleInputChange = (e) => {
    setLabel(e.target.value); // Update label as the user types
  };

  const handleUpdateLabel = () => {
    if (!label.trim()) {
      toast.error('Edge label cannot be empty!', {
        style: { backgroundColor: '#ef4444', color: 'white' },
      });
    } else {
      onUpdateEdgeLabel({ edgeId: edge.id, label }); // Pass the edge ID and updated label
      toast.success(`Label updated to "${label}"`, {
        style: { backgroundColor: '#22c55e', color: 'white' },
      });
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-full md:max-w-lg w-full m-16 my-16">
        {/* Close Button placed at the top-right corner */}
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-xl text-gray-700">
            &#10005; {/* Close Icon */}
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-center mb-4">Edit Edge Label</h2>

          {/* Input for edge label */}
          <input
            type="text"
            value={label} // Bind the value to the label state
            onChange={handleInputChange} // Update label on change
            className="border border-gray-300 p-2 rounded w-full mb-4"
            placeholder="Enter edge label"
          />

          {/* Button to update the edge label */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateLabel} 
              className="btn btn-primary px-8 py-2 text-white bg-blue-400 hover:bg-blue-600 rounded-lg"
            >
              Update Label
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgePopup;
