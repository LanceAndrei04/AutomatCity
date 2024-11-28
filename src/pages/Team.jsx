import React from 'react';

// Example team members
const teamMembers = [
  {
    name: 'Fhil Joshua Caguicla',
    role: 'Backend Developer',
    skills: 'Node.js, Express, MongoDB, RESTful APIs',
    image: 'https://via.placeholder.com/150', // Replace with real image URL
  },
  {
    name: 'Lance Andrei Espina',
    role: 'Frontend Developer',
    skills: 'React, JavaScript, HTML, CSS, Redux',
    image: 'https://via.placeholder.com/150', // Replace with real image URL
  },
  {
    name: 'Aeron Evangelista',
    role: 'Project Manager',
    skills: 'Agile, Scrum, Leadership, Task Management',
    image: 'https://via.placeholder.com/150', // Replace with real image URL
  },
];

const Team = () => {
  return (
    <div id="team" className="py-16 px-6 mx-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Meet Our Team</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-blue-800">{member.name}</h2>
              <p className="text-lg text-gray-500">{member.role}</p>
              <p className="mt-4 text-gray-600">{member.skills}</p> {/* Changed to skills */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
