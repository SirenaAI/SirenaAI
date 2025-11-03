import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-background"></div>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M3 3h17M3 9h17M3 15h17"/>
            </svg>
          </div>
          <h1 className="display-medium">Inicio de sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            icon={
              <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                <circle cx="7.5" cy="4" r="3"/>
                <path d="M1 15c0-4 2.5-6 6.5-6s6.5 2 6.5 6"/>
              </svg>
            }
          />

          <div className="password-group">
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              icon={
                <svg width="13" height="16" viewBox="0 0 13 16" fill="currentColor">
                  <rect x="1" y="7" width="11" height="8" rx="1"/>
                  <path d="M3 7V5a3.5 3.5 0 0 1 7 0v2"/>
                </svg>
              }
            />
            <Link to="/cambiar-contrasena" className="forgot-password">
              Olvidé mi contraseña
            </Link>
          </div>

          <div className="auth-actions">
            <Button type="submit" variant="solid" color="dark" size="large" className="auth-submit">
              Iniciar sesión
            </Button>
            
            <div className="auth-switch">
              <span className="body-medium">¿Ya tienes una cuenta?</span>
              <Link to="/registro" className="body-medium auth-link">
                Crea una cuenta
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
