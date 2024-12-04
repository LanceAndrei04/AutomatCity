import React from 'react';
import { motion } from 'framer-motion';
import projectmanager from '../assets/projectmanager.jpg';
import frontend from '../assets/frontend.jpg';
import backend from '../assets/backend.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: "Aeron Evangelista",
      role: "Project Manager",
      description: "GitHub",
      image: projectmanager,
      github: "https://github.com/AeronEvangelista",
      facebook: "https://www.facebook.com/mr.poginglamig"
    },
    {
      name: "Fhil Joshua Caguicla",
      role: "Backend Developer",
      description: "Node.js and Express.js",
      image: backend,
      github: "https://github.com/HusPhil",
      facebook: "https://www.facebook.com/kukuku.caguicla"
    },
    {
      name: "Lance Andrei Espina",
      role: "Frontend Developer",
      description: "HTML, React.js, Tailwind CSS",
      image: frontend,
      github: "https://github.com/LanceAndrei04",
      facebook: "https://www.facebook.com/lance.espina.30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600">
            The brilliant minds behind AutomatCity
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-purple-100/20"
            >
              <div className="p-6">
                <div className="w-32 h-32 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-purple-100"
                  />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-teal-800 bg-clip-text text-transparent mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-medium mb-3 text-center">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center">
                  {member.description}
                </p>
                {/* Social Media Links */}
                <div className="flex justify-center space-x-4 mt-4">
                  <a 
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-teal-50">
                <div className="flex justify-center space-x-4">
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
