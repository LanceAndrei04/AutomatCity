import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import Simulator from './pages/Simulator';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Router>
      <Toaster position='bottom-right'/>
      <Routes>
        {/* Redirect from the root path to /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Main page route with NavBar */}
        <Route 
          path="/home" 
          element={
            <>
              <NavBar /> 
              <MainPage />
            </>
          } 
        />
        
        {/* Simulator route without NavBar */}
        <Route path="/simulator" element={<Simulator />} />
      </Routes>
    </Router>
  );
};

export default App;
