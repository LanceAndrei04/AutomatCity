import React from 'react';
import { getBezierPath } from 'react-flow-renderer';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}) => {
  // Generate the edge path using react-flow's utility
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      {/* Edge Path */}
      <path
        id={id}
        d={edgePath}
        style={{
          ...style,
          stroke: 'blue', // Edge color
          strokeWidth: 2,
        }}
        fill="none"
        markerEnd="url(#blue-arrowhead)"
      />

      {/* Edge Label */}
      {data?.label && (
        <text
          x={labelX}
          y={labelY}
          style={{
            fontSize: '14px',
            fill: 'blue', // Label color
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            pointerEvents: 'none', // Ensure label doesn't interfere with edge interactions
          }}
        >
          {data.label}
        </text>
      )}

      {/* Arrowhead Marker */}
      <defs>
        <marker
          id="blue-arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 5, 0 10" fill="blue" />
        </marker>
      </defs>
    </>
  );
};

export default CustomEdge;
