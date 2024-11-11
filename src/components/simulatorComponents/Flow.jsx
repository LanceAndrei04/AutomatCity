import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';



const Flow = ({ nodes }) => {

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow >
        <Background variant="dots" gap={16} size={1} color="blue" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
