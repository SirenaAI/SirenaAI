import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FloodMap from './Map'
import MapLegend from './MapLegend'
import Logo from './Logo'
import './MapApp.css'

const MapApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [firstResult, setFirstResult] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [resultsCount, setResultsCount] = useState(0)
  const [allResults, setAllResults] = useState([])
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout()
      navigate('/')
    }
  }

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department)
    setSearchQuery('')
    setHighlightedIndex(0)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const resultToSelect = allResults[highlightedIndex] || firstResult
      if (resultToSelect) {
        handleDepartmentSelect(resultToSelect)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.min(prev + 1, resultsCount - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.max(prev - 1, 0))
    }
  }

  return (
    <div className="map-page">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <Logo />
            </div>
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 8h20M5 15h20M5 22h20"/>
              </svg>
            </button>
          </div>

          <div className="sidebar-content">
            <span className="sidebar-menu-label body-medium">MENU</span>
            <nav className="sidebar-nav">
              <Link to="/" className="sidebar-nav-item">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <path d="M4 12l11-9 11 9v13H4z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M10 26V16h6v10"/>
                </svg>
                <span className="body-medium">Inicio</span>
              </Link>
              <Link to="/app" className="sidebar-nav-item active">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M15 8v7l5 3"/>
                </svg>
                <span className="body-medium">Mapa</span>
              </Link>
              <Link to="/contacto" className="sidebar-nav-item">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <rect x="5" y="7" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M5 10l10 7 10-7"/>
                </svg>
                <span className="body-medium">Contacto</span>
              </Link>
            </nav>
          </div>

          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                {user?.nombre?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="user-details">
                <p className="body-medium">{user?.nombre || user?.username}</p>
                <p className="body-medium text-muted">{user?.username}</p>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M8 2H3v14h5M12 6l4 4-4 4M16 10H6"/>
              </svg>
              <span className="body-medium">Cerrar sesión</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="map-main">
        {/* Top Bar */}
        <div className="map-topbar">
          {!sidebarOpen && (
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 8h20M5 15h20M5 22h20"/>
              </svg>
            </button>
          )}
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="9" r="6"/>
              <path d="M14 14l5 5"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar departamento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="body-medium"
            />
          </div>
        </div>

        {/* Map */}
        <div className="map-container">
          <FloodMap 
            searchQuery={searchQuery} 
            selectedDepartment={selectedDepartment}
            onDepartmentSelect={handleDepartmentSelect}
            onFirstResultChange={setFirstResult}
            highlightedIndex={highlightedIndex}
            onResultsCountChange={setResultsCount}
            onAllResultsChange={setAllResults}
          />
          <MapLegend />
        </div>
      </main>
    </div>
  )
}

export default MapApp
