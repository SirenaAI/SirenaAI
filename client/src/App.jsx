import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import AuthProvider from './components/AuthProvider'
import Landing from './components/Landing'
import MapApp from './components/MapApp'
import ContactPage from './components/ContactPage'
import ProtectedRoute from './components/ProtectedRoute'
import api from './api'
import './App.css'

function App() {
  useEffect(() => {
    const checkConnections = async () => {
      try {
        const data = await api.healthCheck()
        console.log('✅ Conexión exitosa con el backend:', data)
      } catch (error) {
        console.error('❌ Error al conectar con el backend:', error.message)
      }

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
            <Route path="/contacto" element={<ContactPage />} />
            <Route 
              path="/app" 
              element={
                <ProtectedRoute requireAuth={true}>
                  <MapApp />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
