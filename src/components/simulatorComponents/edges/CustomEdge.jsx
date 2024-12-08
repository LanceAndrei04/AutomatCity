import React from 'react';
import { getBezierPath, BaseEdge } from '@xyflow/react';

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
  label
}) => {
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
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: '#000000',
          strokeWidth: 2,
        }}
        markerEnd="url(#black-arrow)"
      />

      {/* Edge Label */}
      {data?.label && (
        <g>
          <rect
            x={labelX - 12}
            y={labelY - 10}
            width="24"
            height="20"
            fill="white"
            rx="4"
          />
          {/* Label text */}
          <text
            x={labelX}
            y={labelY}
            style={{
              fontSize: '14px',
              fill: '#000000',
              fontWeight: 500,
              textAnchor: 'middle',
              dominantBaseline: 'central',
              pointerEvents: 'none',
            }}
          >
            {data.label}
          </text>
        </g>
      )}

      {/* Arrow Marker Definition */}
      <defs>
        <marker
          id="black-arrow"
          viewBox="0 0 10 10"
          markerWidth="5"
          markerHeight="5"
          refX="7"
          refY="5"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            fill="#000000"
            strokeWidth="0"
          />
        </marker>
      </defs>
    </>
  );
};

export default CustomEdge;
