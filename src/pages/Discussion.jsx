import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AcademicCapIcon, 
  PuzzlePieceIcon, 
  LightBulbIcon,
  BeakerIcon,
  ArrowRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const ContentSection = ({ title, icon, color, children, isActive, onClick }) => (
  <motion.div
    layout
    onClick={onClick}
    className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer hover:bg-white ${
      isActive ? 'col-span-full' : ''
    }`}
    whileHover={{ y: -2, scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          {icon}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>
            <ChevronDownIcon 
              className={`w-5 h-5 transform transition-transform ${isActive ? 'rotate-180' : ''}`}
            />
          </div>
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </motion.div>
);

const Discussion = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 'intro',
      title: 'Introduction to Automata Theory',
      icon: <AcademicCapIcon className="w-6 h-6 text-white" />,
      color: 'from-blue-500 to-blue-600',
      content: (
        <div className="space-y-4 text-gray-600">
          <p>
            Automata Theory is a fundamental branch of theoretical computer science that studies abstract machines
            and the problems they can solve. It provides the theoretical foundation for many aspects of computer science,
            from compiler design to artificial intelligence.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Key Concepts:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Abstract machines and their computation capabilities</li>
              <li>Formal languages and their classifications</li>
              <li>Mathematical models of computation</li>
              <li>State transitions and processing rules</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Importance in Computer Science:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Foundation for programming language design</li>
              <li>Basis for compiler construction</li>
              <li>Essential for formal verification</li>
              <li>Crucial in pattern matching and text processing</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'dfa',
      title: 'Deterministic Finite Automata (DFA)',
      icon: <PuzzlePieceIcon className="w-6 h-6 text-white" />,
      color: 'from-purple-500 to-purple-600',
      content: (
        <div className="space-y-4 text-gray-600">
          <p>
            A Deterministic Finite Automaton (DFA) is the simplest form of automaton, characterized by its
            predictable behavior and finite number of states. For each input symbol, a DFA transitions to
            exactly one state.
          </p>

          <div className="bg-purple-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Components of a DFA:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Finite set of states (Q)</li>
              <li>Input alphabet (Σ)</li>
              <li>Transition function (δ)</li>
              <li>Initial state (q₀)</li>
              <li>Set of accept states (F)</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Key Properties:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Exactly one transition for each input symbol</li>
              <li>No epsilon (empty) transitions allowed</li>
              <li>Always starts in the initial state</li>
              <li>Accepts input if it ends in an accept state</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Real-world Applications:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Lexical analysis in compilers</li>
              <li>Pattern matching in text editors</li>
              <li>Protocol specification</li>
              <li>Digital circuit design</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'nfa',
      title: 'Non-deterministic Finite Automata (NFA)',
      icon: <LightBulbIcon className="w-6 h-6 text-white" />,
      color: 'from-indigo-500 to-indigo-600',
      content: (
        <div className="space-y-4 text-gray-600">
          <p>
            A Non-deterministic Finite Automaton (NFA) is a more flexible version of a DFA that allows
            multiple possible transitions for the same input symbol. This non-determinism makes NFAs
            more powerful in terms of expression, though not in terms of computational power.
          </p>

          <div className="bg-indigo-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Multiple possible transitions for same input</li>
              <li>Epsilon (ε) transitions allowed</li>
              <li>Can be converted to equivalent DFA</li>
              <li>More compact representation than DFA</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Advantages over DFA:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>More intuitive design for complex patterns</li>
              <li>Often requires fewer states</li>
              <li>Easier to construct for certain problems</li>
              <li>Natural representation of parallel processes</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'applications',
      title: 'Applications and Impact',
      icon: <BeakerIcon className="w-6 h-6 text-white" />,
      color: 'from-green-500 to-green-600',
      content: (
        <div className="space-y-4 text-gray-600">
          <p>
            Automata theory has widespread applications across computer science and beyond. Its principles
            form the foundation for many modern computing technologies and tools.
          </p>

          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Software Development:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Compiler design and implementation</li>
              <li>Regular expression processing</li>
              <li>Syntax highlighting in text editors</li>
              <li>Code analysis tools</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">System Design:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Protocol verification</li>
              <li>Hardware circuit design</li>
              <li>Communication systems</li>
              <li>Security systems</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Emerging Applications:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Natural language processing</li>
              <li>Machine learning models</li>
              <li>Biological sequence analysis</li>
              <li>Quantum computing algorithms</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Content */}
      <div className="max-w-7xl mt-8 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Automata Theory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the fundamental concepts of automata theory and their applications
            in computer science. Click each section to learn more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <ContentSection
              key={section.id}
              title={section.title}
              icon={section.icon}
              color={section.color}
              isActive={activeSection === section.id}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              {section.content}
            </ContentSection>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/simulator"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-xl
                    font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105
                    transition duration-200 shadow-lg flex items-center justify-center mx-auto">
            Try the Interactive Simulator
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Discussion;
