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
      color: '#ffff',
      fontWeight: 'bold',
      position: 'relative',
      boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.7)',
      border: selected ? '2px solid #010101' : 'none', // Apply border if selected
    };

    switch (state) {
      case 'initial':
        return { ...baseStyle, backgroundColor: '#22C55E' }; // Green
      case 'final':
        return { ...baseStyle, backgroundColor: '#3B82F6' }; // Blue
      case 'trap':
        return { ...baseStyle, backgroundColor: '#EF4444' }; // Red
      case 'regular':
        return { ...baseStyle, backgroundColor: '#FACC15' }; // Yellow
      default:
        return { ...baseStyle, backgroundColor: '#6B7280' }; // Default Gray
    }
  };

  return (
    <div id={id} style={getNodeStyle(data.state, selected)}>
      {data.label.toUpperCase()} {/* Display node label in uppercase */}

      <Handle type="source" position="right" id="source-right" style={{ right: '-8px', backgroundColor: '#22C55E' }} />
      <Handle type="target" position="top" id="target-top" style={{ top: '-8px', backgroundColor: '#6B7280' }} />
      <Handle type="target" position="left" id="target-left" style={{ left: '-8px', backgroundColor: '#6B7280' }} />
      <Handle type="target" position="bottom" id="target-bottom" style={{ bottom: '-8px', backgroundColor: '#6B7280' }} />
    </div>
  );
};

export default CustomNodes;