import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src="/sirena.svg" alt="S" className="logo-s" />
      <span className="logo-text">IRENA</span>
    </Link>
  );
};

export default Logo;
