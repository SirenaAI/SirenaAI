import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Landing from './components/Landing'
import MapApp from './components/MapApp'
import './App.css'

function App() {
  useEffect(() => {
    // Hacer health check al backend y test de DB cuando se inicia la aplicación
    const checkConnections = async () => {
      // Chequear backend
      try {
        const response = await fetch('/api/health')
        
        if (response.ok) {
          const data = await response.json()
          console.log('✅ Conexión exitosa con el backend:', data)
        } else {
          console.warn('⚠️ El backend respondió pero con error:', response.status)
        }
      } catch (error) {
        console.error('❌ Error al conectar con el backend:', error.message)
      }

      // Chequear base de datos
      try {
        const dbResponse = await fetch('/api/db-test')
        
        if (dbResponse.ok) {
          const dbData = await dbResponse.json()
          console.log('✅ Conexión exitosa con la base de datos:', dbData)
        } else {
          console.warn('⚠️ Error en la conexión a la base de datos:', dbResponse.status)
        }
      } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message)
      }
    }

    checkConnections()
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<MapApp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
