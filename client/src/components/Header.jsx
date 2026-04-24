import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'
import Logo from './Logo'
import Button from './Button'
import Auth from './Auth'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'

const Header = ({ onAuthOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const { t } = useLanguage()
  const [showAuth, setShowAuth] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  
  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    if (window.confirm(t('header.confirmLogout'))) {
      logout()
      navigate('/')
    }
  }

  const handleOpenAuth = (mode) => {
    setAuthMode(mode)
    setShowAuth(true)
    if (onAuthOpen) {
      onAuthOpen(mode)
    }
  }

  const handleCloseAuth = () => {
    setShowAuth(false)
  }

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const renderNavLinks = () => (
    <>
      <Link 
        to="/" 
        className={`header-link ${isActive('/') ? 'active' : ''}`}
      >
        {t('header.home')}
      </Link>
      <Link 
        to="/contacto" 
        className={`header-link ${isActive('/contacto') ? 'active' : ''}`}
      >
        {t('header.contact')}
      </Link>
      {isAuthenticated() && (
        <Link 
          to="/app" 
          className={`header-link ${isActive('/app') ? 'active' : ''}`}
        >
          {t('header.map')}
        </Link>
      )}
    </>
  )

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Logo />

          <button
            type="button"
            className="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        
          <nav className="header-nav">
            {renderNavLinks()}
          </nav>
        
          <div className="header-actions">
            {isAuthenticated() ? (
              <>
                <span className="header-user body-medium">
                {t('header.greeting', { name: user?.nombre || user?.username })}
                </span>
                <Button 
                  variant="border" 
                  size="small"
                  onClick={handleLogout}
                >
                {t('header.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="solid" 
                  color="primary" 
                  size="small"
                  onClick={() => handleOpenAuth('register')}
                >
                {t('header.signUp')}
                </Button>
                <Button 
                  variant="border" 
                  size="small"
                  onClick={() => handleOpenAuth('login')}
                >
                {t('header.logIn')}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="header-mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menu"
          />
          <aside className="header-mobile-panel" aria-label="Menu principal">
            <div className="header-mobile-panel-top">
              <Logo />
              <button
                type="button"
                className="header-mobile-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="header-mobile-nav">
              {renderNavLinks()}
            </nav>

            <div className="header-mobile-actions">
              {isAuthenticated() ? (
                <>
                  <span className="header-user body-medium">
                    {t('header.greeting', { name: user?.nombre || user?.username })}
                  </span>
                  <Button 
                    variant="border" 
                    size="medium"
                    onClick={handleLogout}
                  >
                    {t('header.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="solid" 
                    color="primary" 
                    size="medium"
                    onClick={() => handleOpenAuth('register')}
                  >
                    {t('header.signUp')}
                  </Button>
                  <Button 
                    variant="border" 
                    size="medium"
                    onClick={() => handleOpenAuth('login')}
                  >
                    {t('header.logIn')}
                  </Button>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {/* Modal de autenticación */}
      {showAuth && <Auth onClose={handleCloseAuth} initialMode={authMode} />}
    </>
  )
}

export default Header
