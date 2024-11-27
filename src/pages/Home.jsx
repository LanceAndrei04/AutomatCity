import React from 'react';
import Lottie from 'react-lottie';
import cityAnimation from '../components/assetJson/city.json'; // Your Lottie JSON file

function Home() {
  // Define Lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true, // Start the animation immediately
    animationData: cityAnimation, // Path to your Lottie JSON animation
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Maintain aspect ratio
    },
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">

      {/* Left Side */}
      <div className="flex flex-col justify-center items-start p-8 sm:p-12 w-full sm:w-1/2 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Build, Simulate, Understand!
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Unlock the potential of automation and visualization for better decision-making.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          Get Started
        </button>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="w-full sm:w-1/2 flex justify-center items-center p-4 sm:p-8">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>

    </div>
  );
}

export default Home;
