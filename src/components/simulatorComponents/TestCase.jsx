import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const TestCase = () => {
  const [inputValue, setInputValue] = useState('');
  const [bulbColor, setBulbColor] = useState('gray');
  const [glowClass, setGlowClass] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setBulbColor('gray'); // Reset bulb color to gray on new input
    setGlowClass(''); // Remove glow effect
  };

  const handleSendClick = () => {
    if (inputValue === 'a') {
      setBulbColor('green');
      setGlowClass('glow-green');
      setTimeout(() => {
        setGlowClass(''); // Remove glow effect after a delay
      }, 1000); // Delay to make it look like it turned on
    } else if (inputValue === 'b') {
      setBulbColor('red');
      setGlowClass('glow-red');
      setTimeout(() => {
        setGlowClass(''); // Remove glow effect after a delay
      }, 1000); // Delay to make it look like it turned on
    }
    setDisplayedMessage(inputValue); // Display the message below the bulb
    setInputValue(''); // Clear input after sending
  };

  return (
    <div className="flex flex-col items-center w-full p-4">

      <div className={`flex items-center justify-center mb-2 ${glowClass}`} style={{ color: bulbColor }}>
        <FontAwesomeIcon icon={faLightbulb} size="4x" />
      </div>

      {/* Text Input and Send Button */}
      <div className="flex items-center w-full space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 border-b-2 border-gray-400 bg-transparent outline-none"
        />
        <button onClick={handleSendClick}>
          <FontAwesomeIcon icon={faPaperPlane} className="text-blue-500" />
        </button>
      </div>

      {/* Display the input message below the bulb */}
      {displayedMessage && (
        <div className="mt-2 text-lg text-gray-700">
          {displayedMessage}
        </div>
      )}
    </div>
  );
};

export default TestCase;
