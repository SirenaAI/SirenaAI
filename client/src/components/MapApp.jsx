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
                <svg width="30" height="30" viewBox="15 10 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36 47V35H44V47H54V31H60L40 13L20 31H26V47H36Z" fill="currentColor"/>
                </svg>
                <span className="body-medium">Inicio</span>
              </Link>
              <Link to="/app" className="sidebar-nav-item active">
                <svg width="30" height="30" viewBox="15 5 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 10C51.046 10 60 18.954 60 30C60 41.046 51.046 50 40 50C28.954 50 20 41.046 20 30C20 18.954 28.954 10 40 10ZM48.008 31.756C47.318 30.706 46.82 29.95 44.924 30.25C41.344 30.818 40.946 31.444 40.776 32.476L40.728 32.788L40.678 33.12C40.484 34.486 40.49 35.002 41.118 35.66C43.648 38.316 45.164 40.23 45.624 41.35C45.848 41.896 46.424 43.55 46.028 45.186C48.4551 44.218 50.6158 42.6841 52.33 40.712C52.55 39.964 52.71 39.032 52.71 37.904V37.694C52.71 35.85 52.71 35.008 51.406 34.262C50.9875 34.0233 50.5569 33.8063 50.116 33.612C49.382 33.278 48.896 33.06 48.24 32.1C48.16 31.9867 48.0827 31.872 48.008 31.756ZM40 13.666C35.366 13.666 31.18 15.598 28.208 18.698C28.562 18.944 28.87 19.29 29.082 19.766C29.49 20.68 29.49 21.622 29.49 22.456C29.49 23.112 29.49 23.736 29.7 24.186C29.988 24.802 31.232 25.066 32.33 25.294C32.724 25.378 33.128 25.462 33.496 25.564C34.508 25.844 35.292 26.754 35.918 27.484C36.178 27.786 36.564 28.232 36.758 28.344C36.858 28.272 37.18 27.922 37.338 27.348C37.462 26.908 37.426 26.52 37.248 26.308C36.128 24.988 36.19 22.448 36.536 21.51C37.08 20.032 38.78 20.142 40.024 20.222C40.488 20.252 40.924 20.282 41.252 20.24C42.496 20.084 42.88 18.19 43.15 17.82C43.734 17.02 45.522 15.814 46.63 15.07C44.5437 14.1398 42.2843 13.6613 40 13.666Z" fill="currentColor"/>
                </svg>
                <span className="body-medium">Mapa</span>
              </Link>
              <Link to="/contacto" className="sidebar-nav-item">
                <svg width="30" height="30" viewBox="15 10 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 45.5C22.9 45.5 21.9587 45.1209 21.176 44.3627C20.3933 43.6045 20.0013 42.6919 20 41.625V18.375C20 17.3094 20.392 16.3975 21.176 15.6392C21.96 14.881 22.9013 14.5013 24 14.5H56C57.1 14.5 58.042 14.8797 58.826 15.6392C59.61 16.3987 60.0013 17.3107 60 18.375V41.625C60 42.6906 59.6087 43.6032 58.826 44.3627C58.0433 45.1222 57.1013 45.5013 56 45.5H24ZM40 31.9375L56 22.25V18.375L40 28.0625L24 18.375V22.25L40 31.9375Z" fill="currentColor"/>
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
              <svg width="24" height="24" viewBox="3 8 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 29C6.45 29 5.97933 28.8043 5.588 28.413C5.19667 28.0217 5.00067 27.5507 5 27V13C5 12.45 5.196 11.9793 5.588 11.588C5.98 11.1967 6.45067 11.0007 7 11H14V13H7V27H14V29H7ZM18 25L16.625 23.55L19.175 21H11V19H19.175L16.625 16.45L18 15L23 20L18 25Z" fill="currentColor"/>
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

        {/* Search results dropdown */}
        {searchQuery && allResults.length > 0 && (
          <div className={`search-results-dropdown ${sidebarOpen ? 'with-sidebar' : ''}`}>
            {allResults.map((result, index) => (
              <div
                key={`${result.id}-${index}`}
                className={`search-result-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                onClick={() => handleDepartmentSelect(result)}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}

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
