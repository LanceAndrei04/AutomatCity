import React from 'react';
import Home from './Home';
import Discussion from './Discussion';
import Team from './Team';


const MainPage = () => {
  return (
    <div className="overflow-hidden">
      <section id="home" className="min-h-[100vh] flex items-center justify-center bg-blue-200 relative">
        {/* Adjust mt-[64px] according to your navbar height */}
        <Home />
      </section>
      <section id="discussion" className="min-h-[100vh] flex items-center justify-center bg-gray-200 relative">
        <Discussion />
      </section>
      <section id="team" className="min-h-[100vh] flex items-center justify-center bg-gray-300">
        <Team />
      </section>
    </div>
  );
};

export default MainPage;
