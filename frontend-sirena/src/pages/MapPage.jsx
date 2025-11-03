import React, { useState } from 'react';
import './MapPage.css';

const MapPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="map-page">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.65 2.67C22.65 2.67 19 0 19 0L4.32 5.28C4.32 5.28 0.09 2.68 0.09 2.68L0 2.61V5.28L4.21 1.3L22.65 2.67Z" fill="#030F49"/>
                </svg>
              </div>
              <span className="logo-text h1">IRENA</span>
            </div>
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                <path d="M5 8h20M5 15h20M5 22h20" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          <div className="sidebar-content">
            <span className="sidebar-menu-label body-medium">MENU</span>
            <nav className="sidebar-nav">
              <button className="sidebar-nav-item">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <rect width="30" height="30" rx="4"/>
                </svg>
                <span className="body-medium">Example</span>
              </button>
              <button className="sidebar-nav-item">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <rect width="30" height="30" rx="4"/>
                </svg>
                <span className="body-medium">Example</span>
              </button>
              <button className="sidebar-nav-item">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <rect width="30" height="30" rx="4"/>
                </svg>
                <span className="body-medium">Example</span>
              </button>
              <button className="sidebar-nav-item">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <rect width="30" height="30" rx="4"/>
                </svg>
                <span className="body-medium">Example</span>
              </button>
            </nav>
          </div>

          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">Pfp</div>
              <div className="user-details">
                <p className="body-medium">Usuario123</p>
                <p className="body-medium text-muted">gmail@gmail.com</p>
              </div>
            </div>
            <button className="logout-btn">
              <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 29C6.45 29 5.97933 28.8043 5.588 28.413C5.19667 28.0217 5.00067 27.5507 5 27V13C5 12.45 5.196 11.9793 5.588 11.588C5.98 11.1967 6.45067 11.0007 7 11H14V13H7V27H14V29H7ZM18 25L16.625 23.55L19.175 21H11V19H19.175L16.625 16.45L18 15L23 20L18 25Z" fill="#606060"/>
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
              <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                <path d="M5 8h20M5 15h20M5 22h20" stroke="currentColor" strokeWidth="2"/>
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
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="body-medium"
            />
          </div>

          <button 
            className="filter-toggle"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
              <path d="M5 8h20M8 15h14M11 22h8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {/* Filter Bar */}
        {filterOpen && (
          <div className="filter-bar">
            <div className="filter-section">
              <h3 className="body-medium">Filtros</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="filter-color" style={{backgroundColor: '#8B0000'}}></span>
                  <span className="body-medium">Bordó</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" defaultChecked />
                  <span className="filter-color" style={{backgroundColor: '#FF0000'}}></span>
                  <span className="body-medium">Rojo</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="filter-color" style={{backgroundColor: '#FFFF00'}}></span>
                  <span className="body-medium">Amarillo</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" defaultChecked />
                  <span className="filter-color" style={{backgroundColor: '#00FF00'}}></span>
                  <span className="body-medium">Verde</span>
                </label>
              </div>
            </div>
            <button className="filter-cancel body-medium">Cancelar</button>
          </div>
        )}

        {/* Map */}
        <div className="map-container">
          <div className="map-placeholder">
            <span className="display-large">mapa</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapPage;
