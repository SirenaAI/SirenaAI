import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="display-medium">
              Predicción de <br />
              inundaciones con IA
            </h1>
            <p className="h3" style={{ color: 'rgba(3, 15, 73, 0.7)' }}>
              Anticipamos las lluvias, prevenimos riesgos
            </p>
            <Link to="/registro">
              <Button variant="solid" color="primary" size="large" icon={
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.33l6.67 6.67H3.33L10 3.33z"/>
                </svg>
              }>
                Empezar
              </Button>
            </Link>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">
              <span className="display-small">Imagen</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2 className="display-small">Nuestro proyecto</h2>
            <p className="body-medium">
              Sirena es una herramienta de inteligencia artificial que predice zonas con riesgo de
              inundación en Argentina. Analiza datos meteorológicos, del terreno y del sistema de
              desagües para anticipar posibles eventos y reducir daños. Nuestro objetivo es brindar
              información precisa para la prevención y gestión del riesgo hídrico.
            </p>
          </div>
          <div className="about-image">
            <span className="display-large">Foto</span>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <p className="display-small">+200<br/>Localidades</p>
            </div>
            <div className="stat-card">
              <p className="display-small">+10<br/>Databases</p>
            </div>
            <div className="stat-card">
              <p className="display-small">90%<br/>Precisión</p>
            </div>
            <div className="stat-card">
              <p className="display-small">+1.000<br/>Datos utilizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="ai-section">
        <div className="ai-container">
          <h2 className="display-small">Nuestra tecnología predictiva</h2>
          <div className="ai-cards">
            <div className="ai-card">
              <div className="ai-icon">
                <svg width="30" height="23" viewBox="0 0 30 23" fill="currentColor">
                  <rect width="30" height="23" rx="2"/>
                </svg>
              </div>
              <h3 className="body-large">Recolección y preparación de datos</h3>
              <p className="body-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu dolor sed arcu
                eleifend tincidunt. In hac habitasse platea dictumst.
              </p>
            </div>
            <div className="ai-card">
              <div className="ai-icon">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12.5" cy="12.5" r="10"/>
                  <path d="M12.5 6v6.5l4 4"/>
                </svg>
              </div>
              <h3 className="body-large">Análisis predictivo</h3>
              <p className="body-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu dolor sed arcu
                eleifend tincidunt. In hac habitasse platea dictumst.
              </p>
            </div>
            <div className="ai-card">
              <div className="ai-icon">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="15" cy="15" r="8"/>
                  <circle cx="15" cy="15" r="3" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="body-large">Evaluación y mejora del modelo</h3>
              <p className="body-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu dolor sed arcu
                eleifend tincidunt. In hac habitasse platea dictumst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiaries Section */}
      <section className="beneficiaries-section">
        <div className="beneficiaries-container">
          <h2 className="display-small">Impacto y alcance de nuestro proyecto</h2>
          <div className="beneficiaries-cards">
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="27" viewBox="0 0 30 27" fill="currentColor">
                    <path d="M15 0l5 10h10l-8 8 3 9-10-6-10 6 3-9-8-8h10z"/>
                  </svg>
                </div>
                <h3 className="h3">Población Civil</h3>
              </div>
              <p className="body-medium">
                Las comunidades en zonas de riesgo pueden acceder a información anticipada y confiable
                sobre posibles inundaciones, lo que les permite tomar medidas preventivas y reducir daños.
              </p>
            </div>
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                    <rect width="30" height="30" rx="4"/>
                  </svg>
                </div>
                <h3 className="h3">Empresas e industria</h3>
              </div>
              <p className="body-medium">
                El acceso a datos predictivos ayuda a las empresas a planificar su producción, proteger
                sus infraestructuras y minimizar pérdidas frente a eventos climáticos extremos.
              </p>
            </div>
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                    <rect width="30" height="30" rx="4"/>
                  </svg>
                </div>
                <h3 className="h3">Administraciones públicas</h3>
              </div>
              <p className="body-medium">
                Los gobiernos locales y organismos estatales pueden usar los análisis del sistema para
                diseñar políticas de prevención, respuesta y gestión del riesgo hídrico.
              </p>
            </div>
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                    <rect width="30" height="30" rx="4"/>
                  </svg>
                </div>
                <h3 className="h3">Otras entidades</h3>
              </div>
              <p className="body-medium">
                Instituciones académicas, organizaciones ambientales y grupos de investigación pueden
                aprovechar los datos generados por SIRENA para estudios y desarrollo de proyectos sostenibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
