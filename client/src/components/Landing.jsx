import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Auth from './Auth'
import './Landing.css'

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout()
    }
  }

  return (
    <div className="landing">
      <div className="landing-content">

        {/* Menú superior */}
        <div className="menu">
          {isAuthenticated() ? (
            <div className="user-menu">
              {console.log(user)}
              <span className="welcome-text">Bienvenido, {user?.nombre || user?.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button 
              className="menu-button" 
              onClick={() => setShowAuth(true)}
            >
              Iniciar Sesión
            </button>
          )}
        </div>

        {/* Sección hero */}
        <div className="hero-section">
          <h1 className="hero-title">Sirena</h1>
          <h2 className="hero-subtitle">Sistema Inteligente de Alerta de Inundaciones</h2>
          <p className="hero-description">
            Monitorea en tiempo real las condiciones hídricas y recibe alertas tempranas 
            sobre riesgos de inundación en tu área.
          </p>
          {isAuthenticated() ? (
            <Link to="/app" className="cta-button">
              Acceder al Mapa
            </Link>
          ) : (
            <button 
              className="cta-button" 
              onClick={() => setShowAuth(true)}
            >
              Iniciar Sesión para Acceder
            </button>
          )}
        </div>
        
        {/* Features */}
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

      {/* Modal de autenticación */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Landing

