import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import Button from './Button';
import Auth from './Auth';
import { useAuth } from '../hooks/useAuth';

const Header = ({ onAuthOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
      navigate('/');
    }
  };

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
    if (onAuthOpen) {
      onAuthOpen(mode);
    }
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  return (
    <>
    <header className="header">
      <div className="header-container">
        <Logo />
        
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`header-link ${isActive('/') ? 'active' : ''}`}
          >
            Inicio
          </Link>
          <Link 
            to="/contacto" 
            className={`header-link ${isActive('/contacto') ? 'active' : ''}`}
          >
            Contacto
          </Link>
          {isAuthenticated() && (
            <Link 
              to="/app" 
              className={`header-link ${isActive('/app') ? 'active' : ''}`}
            >
              Mapa
            </Link>
          )}
        </nav>
        
        <div className="header-actions">
          {isAuthenticated() ? (
            <>
              <span className="header-user body-medium">
                Hola, {user?.nombre || user?.username}
              </span>
              <Button 
                variant="border" 
                size="small"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="solid" 
                color="primary" 
                size="small"
                onClick={() => handleOpenAuth('register')}
              >
                Sign up
              </Button>
              <Button 
                variant="border" 
                size="small"
                onClick={() => handleOpenAuth('login')}
              >
                Log In
              </Button>
            </>
          )}
        </div>
      </div>
    </header>

    {/* Modal de autenticación */}
    {showAuth && <Auth onClose={handleCloseAuth} initialMode={authMode} />}
    </>
  );
};

export default Header;
