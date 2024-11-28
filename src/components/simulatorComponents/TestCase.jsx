import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner'; // Import Sonner's toast

// Import animations
import happyFace from '../assetJson/happyFace.json';
import sadFace from '../assetJson/sadFace.json';
import neutralFace from '../assetJson/nuetralFace.json';

const TestCase = ({isDfa, nodes, edges}) => {
  const [inputText, setInputText] = useState('');
  const [sentText, setSentText] = useState('');
  const [animationData, setAnimationData] = useState(neutralFace); // Default neutral face
  const [isTyping, setIsTyping] = useState(false); // Track if the user is typing
  const lottieRef = useRef(null); // Reference to Lottie instance

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setIsTyping(true);  // Set typing status to true
  };

  // Send message and play the Lottie animation
  const handleSend = async () => {
    if (!inputText.trim()) {
      toast.custom((t) => (
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-md flex items-center space-x-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-xl" />
          <span>{`Input cannot be empty!`}</span>
        </div>
      ));
      return;
    }
    
    const processMode = isDfa ? "DFA" : "NFA"

    try {
      const response = await axios.get(
        `http://localhost:3000/automata/process_${processMode.toUpperCase()}`, {
        params: {
          nodes,
          edges,
          testCase: inputText,
        }
      })

      const {result: isAccepted, isValidDFA} = response.data

      if (isAccepted) {
        setAnimationData(happyFace);  // Happy face if accepted
      } else {
        setAnimationData(sadFace);  // Sad face if not
      } 

      if (!isValidDFA && processMode == "DFA") {
        toast.custom((t) => (
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-md flex items-center space-x-2">
            <FontAwesomeIcon icon={faExclamationCircle} className="text-xl" />
            <span>{"Not a valid DFA"}</span>
          </div>
        ));
      }

    } catch (error) {

      console.error("Error at proccessing the automaton:", error)
      setAnimationData(sadFace);

    } finally {

      setSentText(inputText);  // Set the sent message text
      setInputText('');  // Clear input text
      setIsTyping(false);  // Stop typing when the message is sent

    }
    
  };

  // Default options for Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Trigger animation to play based on typing or sentText changes
  useEffect(() => {
    if (sentText) {
      lottieRef.current.play();  // Play the animation after the text is sent
    } else if (!isTyping) {
      lottieRef.current.stop();  // Stop animation when idle or no text is sent
    }
  }, [sentText, isTyping]);

  const textColor = animationData === happyFace ? 'text-green-500' : 'text-red-500';

  return (
    <div className="neumorphic-container p-4 rounded-lg shadow-inner bg-gray-100 w-full max-w-lg mx-auto">
    {/* Lottie Animation */}
    <div className="text-center mb-4 p-2">
      <Lottie
        options={defaultOptions}
        height="auto"
        width="100%"  // Make the Lottie width responsive
        isStopped={sentText === '' && !isTyping}
        isPaused={false}
        ref={lottieRef}
      />
    </div>
  
    {/* Sent message display */}
    {sentText && (
      <div className={`text-center mb-2 text-lg font-bold ${textColor} break-words max-w-full`}>
        {sentText}
      </div>
    )}
  
    {/* Text input and send button */}
    <div className="flex flex-wrap items-center max-w-full w-full">  {/* Make sure parent respects width */}
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}  // Update state when typing
        placeholder="Input string"
        className="flex-1 p-2 rounded-md shadow-inner bg-gray-200 focus:outline-none w-full sm:w-48 box-border"  
      />
      <button
        onClick={handleSend}
        className="ml-2 p-2 text-blue-500 w-full sm:w-auto"
      >
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </div>
  </div>

  );
};

export default TestCase;
