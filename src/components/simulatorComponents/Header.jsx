import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);

  const goToHome = () => {
    navigate('/home');
  };

  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-200 rounded-md">
        {/* Left Side - Title */}
        <h1 className="text-2xl font-bold text-gray-800 neumorphic-text">
          Automaton Simulator
        </h1>

        {/* Right Side - Icons */}
        <div className="flex space-x-4">
          <button
            className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-gray-300"
            onClick={toggleTutorial}
            title="Tutorial"
          >
            <FontAwesomeIcon icon={faCircleInfo} size="lg" />
          </button>
          <button
            className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-gray-300"
            onClick={goToHome}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
          </button>
        </div>
      </header>

      {/* Tutorial Popup */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Tutorial</h2>
              <button
                onClick={toggleTutorial}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">State Types</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#22C55E]"></div>
                    <span>Initial State - Starting point</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#3B82F6]"></div>
                    <span>Final State - Accepting state </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#EF4444]"></div>
                    <span>Trap State - Dead state (DFA only)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#FACC15]"></div>
                    <span>Regular State - Intermediate state</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Controls</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Toggle between DFA and NFA modes using the switch</li>
                  <li>Click and drag on the canvas to move states around</li>
                  <li>Connect states by dragging from the right handle of one state to another</li>
                  <li>Double-click a connection to add/edit transition symbols</li>
                  <li>Use the Test Case panel to verify your automaton</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tips</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>DFA must have exactly one transition for each input symbol from each state</li>
                  <li>NFA can have multiple transitions or ε (epsilon) transitions</li>
                  <li>At least one initial state is required</li>
                  <li>At least one final state is recommended</li>
                  <li>Use the Generate Tuple button to see your automaton in formal notation</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
