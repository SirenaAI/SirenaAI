import { useState, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'
import api from '../api'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const login = async (username, password) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await api.login(username, password)
      
      console.log('🔐 Respuesta del servidor:', response)
      
      if (response.token && response.usuario) {
        const userToken = response.token
        const userData = response.usuario
        
        console.log('👤 Datos del usuario a guardar:', userData)
        
        localStorage.setItem('token', userToken)
        localStorage.setItem('user', JSON.stringify(userData))
        
        setToken(userToken)
        setUser(userData)
        
        return { success: true, message: response.message }
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      console.error('Error en login:', error)
      
      // Usar el mensaje de error del servidor si está disponible
      const errorMessage = error.message || 'Error de conexión con el servidor'
      
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, email, nombre, password) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await api.crearusuario(username, email, nombre, password)
      
      if (response.message && response.usuario) {
        return { success: true, message: response.message }
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      console.error('Error en registro:', error)
      
      // Usar el mensaje de error del servidor si está disponible
      const errorMessage = error.message || 'Error de conexión con el servidor'
      
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async (credential) => {
    try {
      setError(null)
      setLoading(true)
      
      const response = await api.loginWithGoogle(credential)
      
      console.log('🔐 Respuesta del servidor (Google):', response)
      
      if (response.token && response.usuario) {
        const userToken = response.token
        const userData = response.usuario
        
        console.log('👤 Datos del usuario a guardar (Google):', userData)
        
        localStorage.setItem('token', userToken)
        localStorage.setItem('user', JSON.stringify(userData))
        
        setToken(userToken)
        setUser(userData)
        
        return { success: true, message: response.message }
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      console.error('Error en login con Google:', error)
      
      // Usar el mensaje de error del servidor si está disponible
      const errorMessage = error.message || 'Error de conexión con el servidor'
      
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setError(null)
  }

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
    loginWithGoogle,
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

export default AuthProvider
