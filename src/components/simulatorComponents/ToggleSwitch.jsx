const ToggleSwitch = ({ isChecked, onChange }) => {
  const toggle = () => {
    onChange(!isChecked); // Call onChange with the opposite value
  };

  return (
    <div className="flex items-center">
      {/* Label for DFA */}
      <span className={`font-semibold ${isChecked ? 'text-blue-600' : 'text-gray-400'}`}>
        DFA
      </span>

      {/* Toggle Switch */}
      <div
        className={`relative mx-2 w-16 h-8 p-1 cursor-pointer rounded-full 
                    ${isChecked ? 'bg-blue-500' : 'bg-orange-500'} 
                    transition-colors duration-500 ease-in-out`}
        onClick={toggle}
      >
        <div
          className={`relative w-6 h-6 bg-white rounded-full shadow-md transform 
                      transition-transform duration-300 ease-in-out 
                      ${isChecked ? 'translate-x-0' : 'translate-x-8'}`}
        ></div>
      </div>

      {/* Label for NFA */}
      <span className={`font-semibold ${!isChecked ? 'text-orange-500' : 'text-gray-400'}`}>
        NFA
      </span>
    </div>
  );
};

export default ToggleSwitch;