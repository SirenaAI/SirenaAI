import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ContactPage from './pages/ContactPage';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/cambiar-contrasena" element={<PasswordResetPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
