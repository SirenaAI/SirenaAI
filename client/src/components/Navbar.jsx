import { useAuth } from '../hooks/useAuth.jsx'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated()) {
    return null
  }

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout()
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="brand-icon">🌊</span>
          <span className="brand-name">Sirena</span>
        </div>
        
        <div className="navbar-user">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="username">{user?.nombre || user?.username}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
