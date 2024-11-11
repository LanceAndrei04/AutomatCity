import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import ToggleSwitch from './ToggleSwitch';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 rounded-md  ">
      {/* Left Side - Title */}
      <h1 className="text-2xl font-bold text-gray-800 neumorphic-text">
        Automaton Simulator
      </h1>

      <div className='flex justify-center neumorphic-btn'>
          <ToggleSwitch />
        </div>
      

      {/* Right Side - Icons */}
      <div className="flex space-x-4">
        <button className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-gray-300">
          <FontAwesomeIcon icon={faHome} size="lg" />
        </button>
        <button className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-gray-300">
          <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
        <button className="p-2 bg-gray-100 rounded-full shadow-md neumorphic-btn hover:bg-gray-300">
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </header>
  );
};

export default Header;
