import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './hooks/useAuth.jsx'
import Landing from './components/Landing'
import MapApp from './components/MapApp'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import api from './api'
import './App.css'

function App() {
  useEffect(() => {
    // Hacer health check al backend y test de DB cuando se inicia la aplicación
    const checkConnections = async () => {
      // Chequear backend
      try {
        const data = await api.healthCheck()
        console.log('✅ Conexión exitosa con el backend:', data)
      } catch (error) {
        console.error('❌ Error al conectar con el backend:', error.message)
      }

      // Chequear base de datos
      try {
        const dbData = await api.dbTest()
        console.log('✅ Conexión exitosa con la base de datos:', dbData)
      } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message)
      }

      try {
        const respuesta = await api.getInundaciones()
        console.log('✅ Datos de inundaciones:', respuesta.data)
      } catch (error) {
        console.error('❌ Error al obtener datos de inundaciones:', error.message)
      }
    }

    checkConnections()
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route 
              path="/app" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <>
                    <Navbar />
                    <div style={{ paddingTop: '60px' }}>
                      <MapApp />
                    </div>
                  </>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
