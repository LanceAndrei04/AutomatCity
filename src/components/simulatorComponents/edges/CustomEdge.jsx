import React, { useEffect, useState } from 'react';
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
  const [path, setPath] = useState('');
  const [labelPos, setLabelPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const [newPath, labelCoords] = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
    });

    setPath(newPath);
    setLabelPos({
      x: (sourceX + targetX) / 2,
      y: (sourceY + targetY) / 2,
    });

  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition]);

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
          <polygon points="0 0, 10 5, 0 10" fill="red" />
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
          x={labelPos.x}
          y={labelPos.y}
          style={{
            fontSize: '14px',
            fill: 'red',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
             backgroundColor: 'yellow',
          }}
        >
          {data.label}
        </text>
      )}
    </>
  );
};

export default CustomEdge;
