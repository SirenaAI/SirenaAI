import { useState, useEffect, createContext, useContext } from 'react'
import api from '../api'

// Crear el contexto de autenticación
const AuthContext = createContext()

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verificar si hay un token válido al cargar la aplicación
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error al cargar datos de usuario:', error)
          logout()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  // Función de login
  const login = async (username, password) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await api.login(username, password)
      
      if (response.token && response.usuario) {
        const userToken = response.token
        const userData = response.usuario
        
        // Guardar en localStorage
        localStorage.setItem('token', userToken)
        localStorage.setItem('user', JSON.stringify(userData))
        
        // Actualizar estado
        setToken(userToken)
        setUser(userData)
        
        return { success: true, message: response.message }
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      console.error('Error en login:', error)
      const errorMessage = error.message.includes('401') 
        ? 'Usuario o contraseña incorrectos' 
        : error.message.includes('400')
        ? 'Faltan datos requeridos'
        : 'Error de conexión con el servidor'
      
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Función de registro
  const register = async (username, password) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await api.crearusuario(username, password)
      
      if (response.message && response.usuario) {
        return { success: true, message: response.message }
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      console.error('Error en registro:', error)
      const errorMessage = error.message.includes('409') 
        ? 'El usuario ya existe' 
        : error.message.includes('400')
        ? 'Faltan datos requeridos'
        : 'Error de conexión con el servidor'
      
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setError(null)
  }

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!(token && user)
  }

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    setError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default useAuth
