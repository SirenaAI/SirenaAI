import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-icon">
        <svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.65 2.67C22.65 2.67 19 0 19 0L4.32 5.28C4.32 5.28 0.09 2.68 0.09 2.68L0 2.61V5.28L4.21 1.3L22.65 2.67Z" fill="#030F49"/>
          <path d="M0.11 0C0.11 0 4.32 1.3 4.32 1.3L19 0L0.11 0Z" fill="#6276AD"/>
        </svg>
      </div>
      <span className="logo-text">IRENA</span>
    </Link>
  );
};

export default Logo;
