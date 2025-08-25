import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [activeForm, setActiveForm] = useState(null) // "login" | "register" | null

  return (
    <div className="landing">
      <div className="landing-content">

        {/* 🔽 Menú desplegable */}
        <div className="menu">
          <button 
            className="menu-button" 
            onClick={() => {
              setShowMenu(!showMenu)
              setActiveForm(null) // se resetea si se vuelve a abrir
            }}
          >
            ☰ Menú
          </button>

          {showMenu && (
            <div className="dropdown">
              {/* Opciones */}
              {!activeForm && (
                <div className="dropdown-options">
                  <button onClick={() => setActiveForm("login")}> Login</button>
                  <button onClick={() => setActiveForm("register")}> Registro</button>
                </div>
              )}

              {/* Formulario Login */}
              {activeForm === "login" && (
                <form className="login-form">
                  <h3>Iniciar Sesión</h3>
                  <input type="text" placeholder="Usuario" />
                  <input type="password" placeholder="Contraseña" />
                  <button type="submit">Entrar</button>
                  <button 
                    type="button" 
                    className="back-button" 
                    onClick={() => setActiveForm(null)}
                  >
                    ⬅ Volver
                  </button>
                </form>
              )}

              {/* Formulario Registro */}
              {activeForm === "register" && (
                <form className="login-form">
                  <h3>Registrarse</h3>
                  <input type="text" placeholder="Nombre de usuario" />
                  <input type="email" placeholder="Correo electrónico" />
                  <input type="password" placeholder="Contraseña" />
                  <button type="submit">Crear cuenta</button>
                  <button 
                    type="button" 
                    className="back-button" 
                    onClick={() => setActiveForm(null)}
                  >
                    ⬅ Volver
                  </button>
                </form>
              )}
            </div>
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
          <Link to="/app" className="cta-button">
            Acceder al Mapa
          </Link>
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
    </div>
  )
}

export default Landing

