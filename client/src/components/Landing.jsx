import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">Sirena</h1>
          <h2 className="hero-subtitle">Sistema Inteligente de Alerta de Inundaciones</h2>
          <p className="hero-description">
            Monitorea en tiempo real las condiciones hídricas y recibe alertas tempranas 
            sobre riesgos de inundación en tu área.
          </p>
          <Link to="/app" className="cta-button">
            Acceder al Mapa
          </Link>
        </div>
        
        <div className="features-section">
          <h3>Características</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h4>Mapas Interactivos</h4>
              <p>Visualiza datos hidrográficos en tiempo real</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h4>Alertas Tempranas</h4>
              <p>Recibe notificaciones sobre riesgos de inundación</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h4>IA Predictiva</h4>
              <p>Algoritmos avanzados para predicción de riesgos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
