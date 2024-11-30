import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* City Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-blue-100">
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4f46e5 1px, transparent 1px),
              linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* City Skyline */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-blue-900/5">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
          >
            <path
              fill="rgba(59, 130, 246, 0.1)"
              d="M0,200 L50,180 L100,190 L150,170 L200,185 L250,160 L300,180 L350,150 L400,170 L450,140 L500,160 L550,130 L600,150 L650,120 L700,140 L750,110 L800,130 L850,100 L900,120 L950,90 L1000,110 L1050,80 L1100,100 L1150,70 L1200,90 L1200,200 L0,200 Z"
            />
            <path
              fill="rgba(99, 102, 241, 0.1)"
              d="M0,200 L50,160 L100,180 L150,150 L200,170 L250,140 L300,160 L350,130 L400,150 L450,120 L500,140 L550,110 L600,130 L650,100 L700,120 L750,90 L800,110 L850,80 L900,100 L950,70 L1000,90 L1050,60 L1100,80 L1150,50 L1200,70 L1200,200 L0,200 Z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AutomatCity
            </h1>
            <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Experience automata theory through an interactive city simulator.
            Learn, explore, and understand complex concepts in a fun way.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center my-12">
            {[
              { title: "Interactive", desc: "Learn by doing" },
              { title: "Visual", desc: "See concepts in action" },
              { title: "Engaging", desc: "City-themed learning" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div>
            <Link
              to="/simulator"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg"
            >
              Try the Simulator
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
