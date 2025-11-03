import React, { useState } from 'react';
import './Input.css';

const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  icon,
  error,
  className = '',
  required = false,
  name,
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label body-medium">
          {label} {required && '*'}
        </label>
      )}
      <div className={`input-container ${error ? 'error' : ''}`}>
        {icon && <div className="input-icon">{icon}</div>}
        <input
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          className="input-field body-medium"
        />
        {isPassword && (
          <button
            type="button"
            className="input-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M10 3C5 3 1 8 1 8s4 5 9 5 9-5 9-5-4-5-9-5z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="2" y1="2" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            ) : (
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M10 3C5 3 1 8 1 8s4 5 9 5 9-5 9-5-4-5-9-5z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className="input-error body-medium">{error}</span>}
    </div>
  );
};

export default Input;
