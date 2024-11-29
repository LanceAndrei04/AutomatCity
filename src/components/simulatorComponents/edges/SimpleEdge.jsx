

const SimpleEdge = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
    return (
      <>
        <path
          id={id}
          d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
          style={{ stroke: 'black', strokeWidth: 2 }}
        />
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2}
          textAnchor="middle"
          style={{ fontSize: 12, fill: 'blue' }}
        >
          {data?.label || 'Default Label'}
        </text>
      </>
    );
  };
export default SimpleEdge  