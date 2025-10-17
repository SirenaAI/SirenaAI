// API configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export const api = {
  baseURL: API_BASE_URL,
  
  // Helper function for making API calls
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    // Obtener token del localStorage si existe
    const token = localStorage.getItem('token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      // Si la respuesta es 401 Y hay un token (usuario autenticado previamente)
      // entonces el token expiró, limpiar y recargar
      if (response.status === 401 && token && endpoint !== '/login' && endpoint !== '/crearusuario') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // Solo recargar si era un usuario autenticado cuyo token expiró
        window.location.reload()
        return
      }
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.error || errorJson.message || `HTTP error! status: ${response.status}`
        } catch {
          errorMessage = errorText || `HTTP error! status: ${response.status}`
        }
        throw new Error(errorMessage)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  },
  async healthCheck() {
    return this.request('/health')
  },

  async dbTest() {
    return this.request('/db-test')
  },

  async getInundaciones() {
    return this.request('/inundaciones')
  },

  async login(username, password) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
  },

  async loginWithGoogle(credential) {
    let respuesta = await this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential })
    })
    console.log(respuesta);
    return respuesta
  },

  async crearusuario(username, password) {
    return this.request('/crearusuario', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
  }
}

export default api
