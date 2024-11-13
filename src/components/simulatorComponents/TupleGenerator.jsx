import React from 'react';

const TupleGenerator = ({ onButtonClick }) => {
  return (
    <button
      className="relative w-full px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-400"
      onClick={onButtonClick} // Trigger the onButtonClick function passed from the parent component
    >
      Generate Tuple
    </button>
  );
};

export default TupleGenerator;
