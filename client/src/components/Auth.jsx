import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import './Auth.css'

const Auth = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showGoogleLink, setShowGoogleLink] = useState(false)
  const [pendingGoogleData, setPendingGoogleData] = useState(null)
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nombre: '',
    password: '',
    confirmPassword: ''
  })
  const [localError, setLocalError] = useState('')
  const [success, setSuccess] = useState('')

  const { login, register, loginWithGoogle, loading, error } = useAuth()

  // Cargar Google Identity Services
  useEffect(() => {
    const loadGoogleScript = () => {
      // Si ya está cargado, solo marcarlo
      if (window.google && window.google.accounts) {
        setGoogleLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.google && window.google.accounts) {
          setGoogleLoaded(true)
        }
      }
      document.head.appendChild(script)
    }

    loadGoogleScript()
  }, [])

  // Inicializar Google cuando el script esté listo
  useEffect(() => {
    if (!googleLoaded) return

    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: false
      })
    }
  }, [googleLoaded])

  // Renderizar botón cuando Google esté listo y cuando cambie isLogin
  useEffect(() => {
    if (!googleLoaded) return

    const buttonDiv = document.getElementById('google-signin-button')
    if (window.google && window.google.accounts && buttonDiv) {
      // Limpiar el contenedor antes de renderizar
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
  }, [googleLoaded, isLogin])

  const handleGoogleSignIn = async (response) => {
    try {
      setLocalError('')
      
      // Login directo con Google - ahora automáticamente crea la cuenta
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
    
    // Validaciones adicionales para registro
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

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <div className="auth-header">
          <h2>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          {onClose && (
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Ingresa tu usuario"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu email"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu nombre completo"
                  disabled={loading}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirma tu contraseña"
                disabled={loading}
              />
            </div>
          )}

          {(localError || error) && (
            <div className="error-message">
              {localError || error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 
             (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="google-signin-section">
          <div className="divider">
            <span>o</span>
          </div>
          <div id="google-signin-button"></div>
        </div>

        <div className="auth-switch">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button 
              type="button" 
              className="switch-button"
              onClick={switchMode}
              disabled={loading}
            >
              {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth
