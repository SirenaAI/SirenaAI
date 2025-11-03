import React, { useState } from 'react';
import './LoginPage.css';
import Input from '../components/Input';
import Button from '../components/Button';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset:', email);
  };

  return (
    <div className="auth-page">
      <div className="auth-background"></div>
      <div className="auth-card auth-card-small">
        <div className="auth-header">
          <div className="auth-icon">
            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M3 3h17M3 9h17M3 15h17"/>
            </svg>
          </div>
          <div>
            <h1 className="display-small">Cambia tu contraseña</h1>
            <p className="body-medium text-muted" style={{ marginTop: '30px' }}>
              Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un codigo para cambiar la contraseña.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={
              <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor">
                <rect width="18" height="14" rx="2"/>
                <path d="M0 0l9 7 9-7" stroke="white" strokeWidth="1"/>
              </svg>
            }
          />

          <div className="auth-actions">
            <Button type="submit" variant="solid" color="dark" size="large" className="auth-submit">
              Aceptar
            </Button>
            
            <div className="auth-switch">
              <span className="body-medium">¿Ya tienes una cuenta?</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;
