import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import Input from './Input'
import Button from './Button'
import sirenaLogo from './sirena-light.svg'
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    setIsLogin(initialMode === 'login')
  }, [initialMode])

  const handleGoogleSignIn = useCallback(async (response) => {
    try {
      setLocalError('')
      
      const result = await loginWithGoogle(response.credential)
      
      if (result.success) {
        setSuccess('¡Login con Google exitoso!')
        setTimeout(() => {
          onClose && onClose()
        }, 1500)
      }
    } catch {
      setLocalError('Error al procesar login con Google')
    }
  }, [loginWithGoogle, onClose])

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google && window.google.accounts) {
        setGoogleLoaded(true)
        initializeGoogleSignIn()
        return
      }

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
  }, [handleGoogleSignIn])

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
    } catch {
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
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5C15 6.32608 14.4732 7.59785 13.5355 8.53553C12.5979 9.47321 11.3261 10 10 10C8.67392 10 7.40215 9.47321 6.46447 8.53553C5.52678 7.59785 5 6.32608 5 5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0ZM10 12.5C15.525 12.5 20 14.7375 20 17.5V20H0V17.5C0 14.7375 4.475 12.5 10 12.5Z" fill="currentColor"/>
    </svg>
  )

  const lockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M15 8H14V5.5C14 2.4625 11.7588 0 9 0C6.23375 0 4 2.51625 4 5.5V8H3C1.3455 8 0 9.3455 0 11V19C0 20.6545 1.3455 22 3 22H15C16.6545 22 18 20.6545 18 19V11C18 9.3455 16.6545 8 15 8ZM5 5.5C5 3.01875 6.66375 1 9 1C11.3107 1 13 3.23625 13 5.5V8H5V5.5ZM17 19C17 20.1027 16.1027 21 15 21H3.00002C1.89727 21 1.00002 20.1027 1.00002 19V11C1.00002 9.89725 1.89727 9 3.00002 9H15C16.1027 9 17 9.89725 17 11V19ZM9.00002 12C8.44777 12 8.00002 12.4477 8.00002 13C8.00002 13.4923 8.29277 13.9172 8.71252 14.0827L8.00002 17.3412C7.86652 17.9482 8.29152 18.5 8.91502 18.5H9.08502C9.70852 18.5 10.1335 17.9482 10 17.3412L9.28752 14.0827C9.70727 13.9172 10 13.4923 10 13C10 12.4477 9.55227 12 9.00002 12Z" fill="currentColor"/>
    </svg>
  )

  const emailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
      <path d="M2.2 18C1.595 18 1.07485 17.785 0.6396 17.355C0.2043 16.925 0.00073333 16.3993 0 15.778V2.222C0 1.60133 0.2043 1.07567 0.6396 0.645C1.07485 0.214333 1.595 -0.000666667 2.2 0H19.8C20.405 0 20.9255 0.215333 21.3615 0.646C21.7975 1.07667 22.0007 1.60233 22 2.222V15.778C22 16.3987 21.7958 16.9247 21.3615 17.356C20.9272 17.7873 20.4065 18.0013 19.8 18H2.2ZM11 10.111L19.8 5V2.222L11 7.333L2.2 2.222V5L11 10.111Z" fill="currentColor"/>
    </svg>
  )

  return (
    <div className="auth-page">
      <div className="auth-background"></div>
      <div className="auth-left-section">
        <img src={sirenaLogo} alt="Sirena AI" className="auth-sirena-logo" />
      </div>
      <div className="auth-card">
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.5 15H3.5M3.5 15L12.125 24M3.5 15L12.125 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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

          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
            icon={lockIcon}
          />

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
