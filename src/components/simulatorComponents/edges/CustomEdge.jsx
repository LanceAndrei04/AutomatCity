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
  markerEnd,
  data,
}) => {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      {/* Arrowhead Marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 5, 0 10" fill="#000" />
        </marker>
      </defs>

      {/* Edge Path */}
      <path
        id={id}
        style={style}
        d={path}
        markerEnd="url(#arrowhead)"
      />

      {/* Edge Label */}
      {data?.label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2}
          style={{
            fontSize: '12px',
            fill: 'red',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
          }}
        >
          {data.label}
        </text>
      )}
    </>
  );
};

export default CustomEdge;
