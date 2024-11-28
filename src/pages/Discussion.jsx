import React, { useState } from 'react';
import Lottie from 'react-lottie'; // Assuming you're using react-lottie for animations
import nfa from '../components/assetJson/nfa.json';
import dfa from '../components/assetJson/dfa.json';
import nfaexample from '../assets/nfa_example.png';
import dfaexample from '../assets/dfa_example.png';

const Discussion = () => {
  // State for managing the expand/collapse of facts
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Automata Theory Definition */}
      <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-xl shadow-lg p-8 mb-12">
        <h1 className="text-5xl font-extrabold text-blue-900 text-center mb-6">Automata Theory</h1>
        <p className="text-lg text-gray-800 text-justify mb-8">
          Automata theory is the study of abstract machines and the problems they can solve. It provides the foundation for understanding how machines process and recognize languages, which is fundamental in computer science and artificial intelligence.
        </p>
      </div>

      {/* Expandable Facts Section */}
      <div className="bg-white rounded-xl shadow-lg mb-12">
        <div 
          className="cursor-pointer p-6 bg-blue-400 hover:bg-blue-500 rounded-t-xl transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-2xl font-semibold text-blue-950">Facts about Automata</h2>
        </div>
        {isExpanded && (
          <div className="p-6 text-lg text-gray-700 bg-blue-50 rounded-b-xl text-justify">
            <ul className="list-disc pl-6 space-y-2">
              <li>Automata can process and recognize regular languages.</li>
              <li>Automata theory underpins many computer science fields, such as compilers and programming languages.</li>
              <li>Finite Automata (DFA and NFA) are used to model systems with finite memory.</li>
              <li>Automata are crucial for understanding the complexity of computation and decision-making.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Alphabet, Language, String Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
        <div className="bg-gray-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:scale-105">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">Alphabet in Automata</h3>
          <p className="text-lg text-gray-700 text-justify">
            An alphabet is a finite set of symbols used by automata to process strings. These symbols are typically denoted by Σ (Sigma). For example, in binary automata, the alphabet is usually 0, 1.
          </p>
        </div>

        <div className="bg-gray-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Language in Automata</h3>
          <p className="text-lg text-gray-700 text-justify">
            A language is a set of strings formed by the alphabet of an automaton. A string is a sequence of symbols from the alphabet. The language recognized by an automaton consists of all the strings that can be accepted by the machine.
          </p>
        </div>

        <div className="bg-gray-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:scale-105">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">String in Automata</h3>
          <p className="text-lg text-gray-700 text-justify">
            A string is a finite sequence of symbols from an alphabet. Strings are the primary inputs that automata process. The way an automaton processes a string determines whether it is accepted or rejected based on the machine’s rules and transitions.
          </p>
        </div>
      </div>

      {/* NFA and DFA Definitions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* DFA Definition */}
        <div className="bg-gradient-to-r from-white to-blue-100 rounded-xl shadow-lg p-8 mb-8">
          <div className="w-full mb-6">
            {/* DFA Animation on Top */}
            <Lottie
              options={{
                animationData: dfa,
                loop: true,
                autoplay: true
              }}
              height={400}
              width="100%"
            />
          </div>
          <h2 className="text-3xl font-semibold text-green-800 text-center mb-6">Deterministic Finite Automaton</h2>
          <div className="p-6 text-lg text-gray-700 text-justify">
            <p>
              A Deterministic Finite Automaton (DFA) is a finite state machine where for each state and input symbol, there is exactly one transition to a next state. In other words, given a state and an input symbol, the machine's behavior is deterministic.
            </p>
          </div>
        </div>

        {/* NFA Definition */}
        <div className="bg-gradient-to-r from-white to-yellow-100 rounded-xl shadow-lg p-8 mb-8">
          <div className="w-full mb-6">
            {/* NFA Animation on Top */}
            <Lottie
              options={{
                animationData: nfa,
                loop: true,
                autoplay: true
              }}
              height={400}
              width="100%"
            />
          </div>
          <h2 className="text-3xl font-semibold text-orange-800 text-center mb-6">Nondeterministic Finite Automaton</h2>
          <div className="p-6 text-lg text-gray-700 text-justify">
            <p>
              A Nondeterministic Finite Automaton (NFA) is similar to a DFA but allows multiple transitions for a single input symbol. An NFA can also transition to a new state without reading any input (ε-transitions).
            </p>
          </div>
        </div>
      </div>

      {/* Separate Containers for Example Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        {/* DFA Example Image */}
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-3xl font-semibold text-center text-blue-950 mb-4">DFA Example</h2>
          <img
            src={dfaexample}
            alt="DFA Example"
            className="w-full h-64 object-contain rounded-xl transform transition-all hover:scale-105"
          />
        </div>

        {/* NFA Example Image */}
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-3xl font-semibold text-center text-blue-950 mb-4">NFA Example</h2>
          <img
            src={nfaexample}
            alt="NFA Example"
            className="w-full h-64 object-contain rounded-xl transform transition-all hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Discussion;
