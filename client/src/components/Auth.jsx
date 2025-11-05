import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
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
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
<rect width="15" height="15" fill="#636363"/>
<rect x="-2384.5" y="-441" width="4619" height="3835" rx="4.5" stroke="#8A38F5" stroke-dasharray="10 5"/>
<g clip-path="url(#clip0_38_17)">
<rect width="1440" height="1024" transform="translate(-795 -421.5)" fill="white"/>
<g clip-path="url(#clip1_38_17)">
<g clip-path="url(#paint0_diamond_38_17_clip_path)" data-figma-skip-parse="true"><g transform="matrix(-0.558608 -0.158921 0.162866 -0.545079 -236.392 -262.579)"><rect x="0" y="0" width="1882.83" height="1733.62" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(1 -1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(-1 1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(-1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/></g></g><rect width="1440" height="1024" transform="translate(-795 -421.5)" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.47450980544090271,&quot;b&quot;:0.56862747669219971,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.14931583404541016,&quot;g&quot;:0.24294567108154297,&quot;b&quot;:0.36538460850715637,&quot;a&quot;:1.0},&quot;position&quot;:0.50},{&quot;color&quot;:{&quot;r&quot;:0.13333334028720856,&quot;g&quot;:0.18039216101169586,&quot;b&quot;:0.31372550129890442,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.47450980544090271,&quot;b&quot;:0.56862747669219971,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.14931583404541016,&quot;g&quot;:0.24294567108154297,&quot;b&quot;:0.36538460850715637,&quot;a&quot;:1.0},&quot;position&quot;:0.50},{&quot;color&quot;:{&quot;r&quot;:0.13333334028720856,&quot;g&quot;:0.18039216101169586,&quot;b&quot;:0.31372550129890442,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:-1117.2159423828125,&quot;m01&quot;:325.73175048828125,&quot;m02&quot;:159.35008239746094,&quot;m10&quot;:-317.84271240234375,&quot;m11&quot;:-1090.1574707031250,&quot;m12&quot;:441.42141723632812},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}"/>
<rect x="-75" y="-209.5" width="600" height="600" rx="20" fill="white"/>
<rect x="-24.5" y="-14.5" width="499" height="44" rx="4.5" fill="white"/>
<rect x="-24.5" y="-14.5" width="499" height="44" rx="4.5" stroke="#A7A7A7"/>
<path d="M7.5 0C8.49456 0 9.44839 0.395088 10.1517 1.09835C10.8549 1.80161 11.25 2.75544 11.25 3.75C11.25 4.74456 10.8549 5.69839 10.1517 6.40165C9.44839 7.10491 8.49456 7.5 7.5 7.5C6.50544 7.5 5.55161 7.10491 4.84835 6.40165C4.14509 5.69839 3.75 4.74456 3.75 3.75C3.75 2.75544 4.14509 1.80161 4.84835 1.09835C5.55161 0.395088 6.50544 0 7.5 0ZM7.5 9.375C11.6438 9.375 15 11.0531 15 13.125V15H0V13.125C0 11.0531 3.35625 9.375 7.5 9.375Z" fill="#7E7E7E"/>
</g>
</g>
<defs>
<clipPath id="paint0_diamond_38_17_clip_path"><rect width="1440" height="1024" transform="translate(-795 -421.5)"/></clipPath><linearGradient id="paint0_diamond_38_17" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
<stop stop-color="#007991"/>
<stop offset="0.5" stop-color="#263E5D"/>
<stop offset="1" stop-color="#222E50"/>
</linearGradient>
<clipPath id="clip0_38_17">
<rect width="1440" height="1024" fill="white" transform="translate(-795 -421.5)"/>
</clipPath>
<clipPath id="clip1_38_17">
<rect width="1440" height="1024" fill="white" transform="translate(-795 -421.5)"/>
</clipPath>
</defs>
</svg>
  )

  const lockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
<rect width="13" height="16" fill="#636363"/>
<rect x="-2385.5" y="-525.5" width="4619" height="3835" rx="4.5" stroke="#8A38F5" stroke-dasharray="10 5"/>
<g clip-path="url(#clip0_38_17)">
<rect width="1440" height="1024" transform="translate(-796 -506)" fill="white"/>
<g clip-path="url(#clip1_38_17)">
<g clip-path="url(#paint0_diamond_38_17_clip_path)" data-figma-skip-parse="true"><g transform="matrix(-0.558608 -0.158921 0.162866 -0.545079 -237.392 -347.079)"><rect x="0" y="0" width="1882.83" height="1733.62" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(1 -1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(-1 1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(-1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/></g></g><rect width="1440" height="1024" transform="translate(-796 -506)" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.47450980544090271,&quot;b&quot;:0.56862747669219971,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.14931583404541016,&quot;g&quot;:0.24294567108154297,&quot;b&quot;:0.36538460850715637,&quot;a&quot;:1.0},&quot;position&quot;:0.50},{&quot;color&quot;:{&quot;r&quot;:0.13333334028720856,&quot;g&quot;:0.18039216101169586,&quot;b&quot;:0.31372550129890442,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.47450980544090271,&quot;b&quot;:0.56862747669219971,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.14931583404541016,&quot;g&quot;:0.24294567108154297,&quot;b&quot;:0.36538460850715637,&quot;a&quot;:1.0},&quot;position&quot;:0.50},{&quot;color&quot;:{&quot;r&quot;:0.13333334028720856,&quot;g&quot;:0.18039216101169586,&quot;b&quot;:0.31372550129890442,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:-1117.2159423828125,&quot;m01&quot;:325.73175048828125,&quot;m02&quot;:158.35008239746094,&quot;m10&quot;:-317.84271240234375,&quot;m11&quot;:-1090.1574707031250,&quot;m12&quot;:356.92141723632812},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}"/>
<rect x="-76" y="-294" width="600" height="600" rx="20" fill="white"/>
<rect x="-25.5" y="-14" width="499" height="44" rx="4.5" fill="white"/>
<rect x="-25.5" y="-14" width="499" height="44" rx="4.5" stroke="#A7A7A7"/>
<path d="M11 6H10.5V4.09175C10.5 1.79725 8.83975 0 6.4815 0C4.11375 0 2.5 1.8355 2.5 4.09175V6H2C0.897 6 0 6.897 0 8V14C0 15.103 0.897 16 2 16H11C12.103 16 13 15.103 13 14V8C13 6.897 12.103 6 11 6ZM3.5 4.09175C3.5 2.38725 4.665 1 6.4815 1C8.27925 1 9.5 2.358 9.5 4.09175V6H3.5V4.09175ZM12 14C12 14.5513 11.5513 15 11 15H2.00002C1.44877 15 1.00002 14.5513 1.00002 14V8C1.00002 7.44875 1.44877 7 2.00002 7H11C11.5513 7 12 7.44875 12 8V14ZM6.50002 9C5.94777 9 5.50002 9.44775 5.50002 10C5.50002 10.3693 5.70252 10.688 6.00002 10.8612V12.5C6.00002 12.776 6.22402 13 6.50002 13C6.77602 13 7.00002 12.776 7.00002 12.5V10.8612C7.29752 10.688 7.50002 10.369 7.50002 10C7.50002 9.44775 7.05227 9 6.50002 9Z" fill="#7E7E7E"/>
</g>
</g>
<defs>
<clipPath id="paint0_diamond_38_17_clip_path"><rect width="1440" height="1024" transform="translate(-796 -506)"/></clipPath><linearGradient id="paint0_diamond_38_17" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
<stop stop-color="#007991"/>
<stop offset="0.5" stop-color="#263E5D"/>
<stop offset="1" stop-color="#222E50"/>
</linearGradient>
<clipPath id="clip0_38_17">
<rect width="1440" height="1024" fill="white" transform="translate(-796 -506)"/>
</clipPath>
<clipPath id="clip1_38_17">
<rect width="1440" height="1024" fill="white" transform="translate(-796 -506)"/>
</clipPath>
</defs>
</svg>
  )

  const emailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
<rect width="18" height="14" fill="#636363"/>
<rect x="-2383" y="-1600" width="4619" height="3835" rx="4.5" stroke="#8A38F5" stroke-dasharray="10 5"/>
<g clip-path="url(#clip0_38_17)">
<rect width="1440" height="1024" transform="translate(-793.5 -499.5)" fill="white"/>
<g clip-path="url(#clip1_38_17)">
<g clip-path="url(#paint0_diamond_38_17_clip_path)" data-figma-skip-parse="true"><g transform="matrix(-0.558608 -0.158921 0.162866 -0.545079 -234.892 -340.579)"><rect x="0" y="0" width="1882.83" height="1733.62" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(1 -1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(-1 1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/><rect x="0" y="0" width="1882.83" height="1733.62" transform="scale(-1)" fill="url(#paint0_diamond_38_17)" opacity="1" shape-rendering="crispEdges"/></g></g><rect width="1440" height="1024" transform="translate(-793.5 -499.5)" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.13333334028720856,&quot;g&quot;:0.18039216101169586,&quot;b&quot;:0.31372550129890442,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.14931583404541016,&quot;g&quot;:0.24294567108154297,&quot;b&quot;:0.36538460850715637,&quot;a&quot;:1.0},&quot;position&quot;:0.50},{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.47450980544090271,&quot;b&quot;:0.56862747669219971,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.13333334028720856,&quot;g&quot;:0.18039216101169586,&quot;b&quot;:0.31372550129890442,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.14931583404541016,&quot;g&quot;:0.24294567108154297,&quot;b&quot;:0.36538460850715637,&quot;a&quot;:1.0},&quot;position&quot;:0.50},{&quot;color&quot;:{&quot;r&quot;:0.0,&quot;g&quot;:0.47450980544090271,&quot;b&quot;:0.56862747669219971,&quot;a&quot;:1.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:-1117.2159423828125,&quot;m01&quot;:325.73175048828125,&quot;m02&quot;:160.85008239746094,&quot;m10&quot;:-317.84271240234375,&quot;m11&quot;:-1090.1574707031250,&quot;m12&quot;:363.42141723632812},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}"/>
<rect x="-73.5" y="-369.5" width="600" height="800" rx="20" fill="white"/>
<rect x="-23" y="-15" width="499" height="44" rx="4.5" fill="white"/>
<rect x="-23" y="-15" width="499" height="44" rx="4.5" stroke="#A7A7A7"/>
<path d="M1.8 14C1.305 14 0.8814 13.8288 0.5292 13.4864C0.177 13.144 0.0006 12.7318 0 12.25V1.75C0 1.26875 0.1764 0.856916 0.5292 0.5145C0.882 0.172083 1.3056 0.000583333 1.8 0H16.2C16.695 0 17.1189 0.1715 17.4717 0.5145C17.8245 0.8575 18.0006 1.26933 18 1.75V12.25C18 12.7312 17.8239 13.1434 17.4717 13.4864C17.1195 13.8294 16.6956 14.0006 16.2 14H1.8ZM9 7.875L16.2 3.5V1.75L9 6.125L1.8 1.75V3.5L9 7.875Z" fill="#7E7E7E"/>
</g>
</g>
<defs>
<clipPath id="paint0_diamond_38_17_clip_path"><rect width="1440" height="1024" transform="translate(-793.5 -499.5)"/></clipPath><linearGradient id="paint0_diamond_38_17" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
<stop stop-color="#222E50"/>
<stop offset="0.5" stop-color="#263E5D"/>
<stop offset="1" stop-color="#007991"/>
</linearGradient>
<clipPath id="clip0_38_17">
<rect width="1440" height="1024" fill="white" transform="translate(-793.5 -499.5)"/>
</clipPath>
<clipPath id="clip1_38_17">
<rect width="1440" height="1024" fill="white" transform="translate(-793.5 -499.5)"/>
</clipPath>
</defs>
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
