import { Link } from 'react-router-dom'
import FloodMap from './Map'
import MapLegend from './MapLegend'
import './MapApp.css'

const MapApp = () => {
  return (
    <div className="map-app">
      <header className="map-header">
        <Link to="/" className="back-button">
          ← Inicio
        </Link>
        <h1>Monitoreo de Inundaciones</h1>
      </header>
      <div className="map-container">
        <FloodMap />
        <MapLegend />
      </div>
    </div>
  )
}

export default MapApp
