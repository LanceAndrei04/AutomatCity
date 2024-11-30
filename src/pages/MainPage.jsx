import React from 'react';
import Home from './Home';
import Discussion from './Discussion';
import Team from './Team';

const MainPage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <section id="home" className="min-h-screen">
        <Home />
      </section>
      
      <section id="discussion" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-80" />
        <div className="relative z-10 w-full">
          <Discussion />
        </div>
      </section>

      <section id="team" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <Team />
      </section>
    </div>
  );
};

export default MainPage;
