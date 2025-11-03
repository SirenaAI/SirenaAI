import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import Input from './Input'
import Button from './Button'
import './Auth.css'

const Auth = ({ onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nombre: '',
    password: '',
    confirmPassword: ''
  })
  const [localError, setLocalError] = useState('')
  const [success, setSuccess] = useState('')
  const [googleLoaded, setGoogleLoaded] = useState(false)

  const { login, register, loginWithGoogle, loading, error } = useAuth()

  // Actualizar isLogin cuando cambia initialMode
  useEffect(() => {
    setIsLogin(initialMode === 'login')
  }, [initialMode])

  // Cargar Google Identity Services
  useEffect(() => {
    const loadGoogleScript = () => {
      // Si ya está cargado, solo marcarlo como listo
      if (window.google && window.google.accounts) {
        setGoogleLoaded(true)
        initializeGoogleSignIn()
        return
      }

      // Si ya existe el script, no lo agregues de nuevo
      if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => {
        setGoogleLoaded(true)
        initializeGoogleSignIn()
      }
      document.head.appendChild(script)
    }

    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: false
        })
      }
    }

    loadGoogleScript()
  }, [])

  const handleGoogleSignIn = async (response) => {
    try {
      setLocalError('')
      
      const result = await loginWithGoogle(response.credential)
      
      if (result.success) {
        setSuccess('¡Login con Google exitoso!')
        setTimeout(() => {
          onClose && onClose()
        }, 1500)
      }
    } catch (err) {
      setLocalError('Error al procesar login con Google')
    }
  }

  // Renderizar botón de Google cuando esté listo
  useEffect(() => {
    if (googleLoaded && window.google && window.google.accounts) {
      const buttonDiv = document.getElementById('google-signin-button')
      if (buttonDiv) {
        buttonDiv.innerHTML = ''
        window.google.accounts.id.renderButton(
          buttonDiv,
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: isLogin ? 'signin_with' : 'signup_with'
          }
        )
      }
    }
  }, [googleLoaded, isLogin])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setLocalError('')
    setSuccess('')
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setLocalError('El nombre de usuario es requerido')
      return false
    }
    
    if (!isLogin) {
      if (!formData.email.trim()) {
        setLocalError('El email es requerido')
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setLocalError('Por favor ingresa un email válido')
        return false
      }
      if (!formData.nombre.trim()) {
        setLocalError('El nombre completo es requerido')
        return false
      }
    }
    
    if (!formData.password.trim()) {
      setLocalError('La contraseña es requerida')
      return false
    }
    if (formData.password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres')
      return false
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      if (isLogin) {
        const result = await login(formData.username, formData.password)
        if (result.success) {
          setSuccess('¡Login exitoso!')
          setTimeout(() => {
            onClose && onClose()
          }, 1500)
        }
      } else {
        const result = await register(formData.username, formData.email, formData.nombre, formData.password)
        if (result.success) {
          setSuccess('¡Usuario creado exitosamente!')
          setTimeout(() => {
            setIsLogin(true)
            setFormData({
              username: formData.username,
              email: '',
              nombre: '',
              password: '',
              confirmPassword: ''
            })
            setSuccess('')
          }, 2000)
        }
      }
    } catch (err) {
      setLocalError('Error inesperado')
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      username: '',
      email: '',
      nombre: '',
      password: '',
      confirmPassword: ''
    })
    setLocalError('')
    setSuccess('')
  }

  const userIcon = (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <circle cx="7.5" cy="4" r="3"/>
      <path d="M1 15c0-4 2.5-6 6.5-6s6.5 2 6.5 6"/>
    </svg>
  )

  const lockIcon = (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="currentColor">
      <rect x="1" y="7" width="11" height="8" rx="1"/>
      <path d="M3 7V5a3.5 3.5 0 0 1 7 0v2"/>
    </svg>
  )

  const emailIcon = (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="0.5" y="0.5" width="14" height="11" rx="1"/>
      <path d="M1 1l6.5 5 6.5-5"/>
    </svg>
  )

  return (
    <div className="auth-page">
      <div className="auth-background"></div>
      <div className="auth-card">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        
        <div className="auth-header">
          <h1 className="display-medium">
            {isLogin ? 'Inicio de sesión' : 'Registro'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleInputChange}
            disabled={loading}
            icon={userIcon}
          />

          {!isLogin && (
            <>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                icon={emailIcon}
              />

              <Input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleInputChange}
                disabled={loading}
                icon={userIcon}
              />
            </>
          )}

          <div className="password-group">
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
              icon={lockIcon}
            />
            {isLogin && (
              <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                Olvidé mi contraseña
              </a>
            )}
          </div>

          {!isLogin && (
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
              icon={lockIcon}
            />
          )}

          {(localError || error) && (
            <div className="error-message body-medium">
              {localError || error}
            </div>
          )}

          {success && (
            <div className="success-message body-medium">
              {success}
            </div>
          )}

          <div className="auth-actions">
            <Button 
              type="submit" 
              variant="solid" 
              color="dark" 
              size="large" 
              className="auth-submit"
              disabled={loading}
            >
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar sesión' : 'Registrarse')}
            </Button>
            
            <div className="auth-divider">
              <span className="body-medium">o</span>
            </div>

            <div id="google-signin-button"></div>
            
            <div className="auth-switch">
              <span className="body-medium">
                {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              </span>
              <button 
                type="button"
                className="body-medium auth-link"
                onClick={switchMode}
                disabled={loading}
              >
                {isLogin ? 'Crea una cuenta' : 'Iniciar sesión'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
