import React from 'react';
import { Handle } from '@xyflow/react';

const CustomNodes = ({ id, data, selected }) => {
  const getNodeStyle = (state, selected) => {
    const baseStyle = {
      borderRadius: '50%',
      width: 100,
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333',
      fontWeight: 'bold',
      position: 'relative',
      boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.7)',
      border: selected ? '2px solid #010101' : 'none', // Apply border if selected
    };

    switch (state) {
      case 'initial':
        return { ...baseStyle, backgroundColor: '#b2ffb2' }; // Green
      case 'final':
        return { ...baseStyle, backgroundColor: '#b2d7ff' }; // Blue
      case 'trap':
        return { ...baseStyle, backgroundColor: '#ffb2b2' }; // Red
      case 'regular':
        return { ...baseStyle, backgroundColor: '#fff9b2' }; // Yellow
      default:
        return { ...baseStyle, backgroundColor: '#e0e0e0' }; // Default Gray
    }
  };

  return (
    <div id={id} style={getNodeStyle(data.state, selected)}>
      {data.label.toUpperCase()} {/* Display node label in uppercase */}

      <Handle type="source" position="right" id="source-right" style={{ right: '-8px', backgroundColor: 'green' }} />
      <Handle type="target" position="top" id="target-top" style={{ top: '-8px', backgroundColor: 'blue' }} />
      <Handle type="target" position="left" id="target-left" style={{ left: '-8px', backgroundColor: 'blue' }} />
      <Handle type="target" position="bottom" id="target-bottom" style={{ bottom: '-8px', backgroundColor: 'blue' }} />
    </div>
  );
};

export default CustomNodes;