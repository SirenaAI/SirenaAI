import React, { useState } from 'react';
import './ContactPage.css';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
  };

  return (
    <div className="contact-page">
      <Header />
      
      <div className="contact-content">
        <div className="contact-banner">
          <h1 className="display-large">
            ¿Listo para optimizar la detección de inundaciones?
          </h1>
        </div>

        <div className="contact-form-section">
          <h2 className="display-small">Contáctanos</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-grid">
              <Input
                label="Nombre"
                type="text"
                name="nombre"
                placeholder="Felipe Doval"
                value={formData.nombre}
                onChange={handleChange}
              />
              
              <Input
                label="Teléfono"
                type="tel"
                name="telefono"
                placeholder="11 1234 5678"
                value={formData.telefono}
                onChange={handleChange}
              />
              
              <Input
                label="Mail"
                type="email"
                name="email"
                placeholder="felgimon123@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div className="input-wrapper">
                <label className="input-label body-medium">Mensaje *</label>
                <textarea
                  name="mensaje"
                  placeholder="Escribe aquí"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="contact-textarea body-medium"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="solid" color="dark" size="large" className="contact-submit">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
