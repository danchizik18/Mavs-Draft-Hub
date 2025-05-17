import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BigBoard from './pages/BigBoard';
import PlayerProfile from './pages/PlayerProfile';
import WelcomeScreen from './pages/WelcomeScreen';
import Navbar from './components/NavBar';
import './styles/App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/bigboard" element={<BigBoard />} />
          <Route path="/player/:id" element={<PlayerProfile />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
