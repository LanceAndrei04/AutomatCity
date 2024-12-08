import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import cityBackground from '../assets/citybackground.png';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* City Background with Gradient */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url(${cityBackground})`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-sky-400/15 to-blue-600/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Title */}
          <div className="space-y-4">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundImage: "linear-gradient(90deg, #2563eb, #9333ea, #2563eb)",
                backgroundSize: "200% 100%"
              }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  display: "inline-block",
                  backgroundImage: "linear-gradient(90deg, #2563eb, #38bdf8, #2563eb)",
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >
                Automat City
              </motion.span>
            </motion.h1>

            {/* Animated Car */}
            <div className="relative h-20 mx-auto w-full max-w-3xl overflow-hidden">
              {/* Static Road Line */}
              <div className="absolute bottom-4 w-full h-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded" />

              {/* Car Animation */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-5 flex items-center"
              >
                <svg 
                  width="100" 
                  height="50" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-blue-600 -mb-2"
                >
                  <path 
                    d="M20 8h-5l-2-3h-2L9 8H4c-1.1 0-2 .9-2 2v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-3c0-1.1-.9-2-2-2zm-3 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM7 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" 
                    fill="currentColor"
                  />
                </svg>
                
                {/* trail effect */}
                <motion.div
                  className="absolute right-0 h-0.5 w-32 bg-gradient-to-r from-blue-600/50 to-transparent"
                  style={{ top: '50%' }}
                />
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Experience automata theory through an interactive state machine simulator.
            </motion.p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center my-12">
              {[
                { title: "Interactive", desc: "Learn by doing" },
                { title: "Visual", desc: "See concepts in action" },
                { title: "Engaging", desc: "Visualize learning" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.2)",
                    transition: { duration: 0.1 }
                  }}
                  className="p-6 rounded-xl backdrop-blur-sm shadow-lg border border-purple-100/20"
                >
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Simulator Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Link
                to="/simulator"
                className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-100 shadow-lg"
              >
                Try the Simulator
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
