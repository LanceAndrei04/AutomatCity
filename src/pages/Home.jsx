import React from 'react';
import Lottie from 'react-lottie';
import building from '../components/assetJson/building.json'; // Your Lottie JSON file
import { motion } from 'framer-motion'; // Framer Motion for animations
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

function Home() {
  // Function to scroll to the discussion section
  const goToDiscussion = () => {
    const discussionSection = document.getElementById('discussion');
    if (discussionSection) {
      discussionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Define Lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: building,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Initialize particles
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particleOptions = {
    background: {
      color: "#ffffff00", // Transparent background
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#FFD700", // Circle color (gold)
      },
      links: {
        enable: false, // Disable connecting lines
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: "out",
      },
      number: {
        value: 50, // Number of particles
      },
      size: {
        value: { min: 2, max: 5 }, // Particle size range
      },
      shape: {
        type: "circle",
      },
    },
  };

  return (
    <div className="relative flex flex-col sm:flex-row h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute inset-0 -z-10" // Ensure particles are behind content
      />

      {/* Left Side */}
      <div className="relative z-10 flex flex-col justify-center items-start p-8 sm:p-12 w-full sm:w-1/2 space-y-6 ml-3">
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-800 mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Build, Simulate, Understand!
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-600"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Unlock the potential of automation and visualization for better decision-making.
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none transform transition-all duration-300 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onClick={goToDiscussion}
        >
          Get Started
        </motion.button>
      </div>

      {/* Right Side: Lottie Animation */}
      <motion.div
        className="relative z-10 w-full sm:w-1/2 flex justify-center items-center p-4 sm:p-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Lottie options={defaultOptions} height="auto" width="100%" />
      </motion.div>
    </div>
  );
}

export default Home;
