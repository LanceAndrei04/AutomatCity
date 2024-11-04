import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const Flow = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}> {/* Ensure it fills the parent */}
      <ReactFlow>
        <Background variant="dots" gap={16} size={1} color="#cccccc"/>
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
