// API configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export const api = {
  baseURL: API_BASE_URL,
  
  // Helper function for making API calls
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  },

  // Specific API endpoints
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

    async crearusuario(username, password) {
    return this.request('/crearusuario', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
  }
}

export default api
