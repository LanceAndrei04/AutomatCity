import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import '@xyflow/react/dist/style.css';

const Flow = ({ nodes }) => {
  console.log('Nodes in Flow:', nodes);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <ReactFlow nodes={nodes}>
        <Background variant="dots" gap={16} size={1} color="blue" />
        <Controls />
      </ReactFlow>

      {/* Container for top-right buttons */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px' }}>
        <button className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-green-300">
          <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
        <button className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-red-300">
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Flow;
