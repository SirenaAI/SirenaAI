import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import './Auth.css'

const Auth = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [localError, setLocalError] = useState('')
  const [success, setSuccess] = useState('')

  const { login, register, loading, error } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar errores cuando el usuario empiece a escribir
    setLocalError('')
    setSuccess('')
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setLocalError('El nombre de usuario es requerido')
      return false
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
        const result = await register(formData.username, formData.password)
        if (result.success) {
          setSuccess('¡Usuario creado exitosamente! Ahora puedes iniciar sesión.')
          setTimeout(() => {
            setIsLogin(true)
            setFormData({
              username: formData.username,
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
          <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
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
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

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
