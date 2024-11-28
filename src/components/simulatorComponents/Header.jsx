import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const goToHome = () => {
    navigate('/home'); // Navigate to the main page
  };
  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 rounded-md">
      {/* Left Side - Title */}
      <h1 className="text-2xl font-bold text-gray-800 neumorphic-text">
        Automaton Simulator
      </h1>

      {/* Right Side - Icons */}
      <div className="flex space-x-4">
        <button className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-gray-300"
        onClick={goToHome}
        >
          <FontAwesomeIcon icon={faHome} size="lg" />
        </button>
        <button className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-gray-300">
          <FontAwesomeIcon icon={faSave} size="lg" /> {/* Save icon */}
        </button>
      </div>
    </header>
  );
};

export default Header;
