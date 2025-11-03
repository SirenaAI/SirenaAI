import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'solid', 
  color = 'primary', 
  size = 'medium',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  icon
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${color} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
