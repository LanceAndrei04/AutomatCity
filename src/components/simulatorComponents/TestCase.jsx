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
  const [testPath, setTestPath] = useState(null);
  const lottieRef = useRef(null); // Reference to Lottie instance

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setIsTyping(true);  // Set typing status to true
  };

  // Send message and play the Lottie animation
  const handleSend = async () => {
    if (!inputText.trim()) {
      toast.error('Input cannot be empty!', {
        style: { backgroundColor: '#ef4444', color: 'white' }
      });
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
        toast.error('Not a valid DFA', {
          style: { backgroundColor: '#ef4444', color: 'white' }
        });
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

  const testInput = () => {
    if (!inputText.trim()) {
      toast.error('Please enter an input string', {
        style: { backgroundColor: '#ef4444', color: 'white' }
      });
      return;
    }

    // Find initial state - check data.state property
    const initialState = nodes.find(node => node.data.state === 'initial');

    if (!initialState) {
      toast.error('No initial state found', {
        style: { backgroundColor: '#ef4444', color: 'white' }
      });
      return;
    }

    let currentState = initialState.id;
    let path = [currentState];
    let accepted = true;

    // Process each character
    for (const char of inputText) {
      // Find valid edge for this character
      const validEdge = edges.find(edge => 
        edge.source === currentState && 
        edge.data?.label === char
      );

      if (!validEdge) {
        accepted = false;
        break;
      }

      currentState = validEdge.target;
      path.push(currentState);
    }

    // Check if final state
    const finalNode = nodes.find(node => node.id === currentState);
    const isAccepted = accepted && finalNode?.data?.state === 'final';

    setTestPath({ path, accepted: isAccepted });
    
    toast(isAccepted ? 'Input accepted!' : 'Input rejected!', {
      style: {
        backgroundColor: isAccepted ? '#22c55e' : '#ef4444',
        color: 'white',
      },
    });
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
    <div className="neumorphic-container p-3 sm:p-4 rounded-lg shadow-inner bg-gray-100 w-full max-w-[95%] sm:max-w-lg mx-auto">
      {/* Lottie Animation */}
      <div className="text-center mb-3 sm:mb-4 p-2">
        <Lottie
          options={defaultOptions}
          height={200}
          width="100%"
          isStopped={sentText === '' && !isTyping}
          isPaused={false}
          ref={lottieRef}
          style={{ maxWidth: '300px', margin: '0 auto' }}
        />
      </div>
    
      {/* Sent message display */}
      {sentText && (
        <div className={`text-center mb-2 text-base sm:text-lg font-bold ${textColor} break-words px-2`}>
          {sentText}
        </div>
      )}
    
      {/* Text input and send button */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Input string"
          className="flex-1 p-2 rounded-md shadow-inner bg-gray-200 focus:outline-none w-full"
        />
        <button
          onClick={handleSend}
          className="sm:ml-2 p-2 text-blue-500 hover:text-blue-600 transition-colors w-full sm:w-auto bg-gray-200 sm:bg-transparent rounded-md sm:rounded-none"
        >
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
        <button
          onClick={testInput}
          className="sm:ml-2 p-2 text-blue-500 hover:text-blue-600 transition-colors w-full sm:w-auto bg-gray-200 sm:bg-transparent rounded-md sm:rounded-none"
        >
          Test
        </button>
      </div>
      {testPath && (
        <div className={`p-2 mt-2 rounded ${testPath.accepted ? 'bg-green-100' : 'bg-red-100'}`}>
          Result: {testPath.accepted ? 'Accepted' : 'Rejected'}
          <br />
          Path: {testPath.path.join(' -> ')}
        </div>
      )}
    </div>

  );
};

export default TestCase;
