import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
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
          <Link 
            to="/mapa" 
            className={`header-link ${isActive('/mapa') ? 'active' : ''}`}
          >
            Mapa
          </Link>
        </nav>
        
        <div className="header-actions">
          <Link to="/registro">
            <Button variant="solid" color="primary" size="small">
              Sign up
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="border" size="small">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
