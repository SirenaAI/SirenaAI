     import { getColorFromValue } from '../utils/colorUtils'
import './MapLegend.css'

const MapLegend = () => {
  const legendItems = [
    { value: 1, label: ' Alto (100%)' },
    { value: 0.75, label: ' Medio-Alto (75%)' },
    { value: 0.5, label: ' Medio (50%)' },
    { value: 0.25, label: ' Bajo-Medio (25%)' },
    { value: 0, label: ' Bajo (0%)' },
    { value: null, label: 'Sin datos' }
  ]

  return (
    <div className="map-legend">
      <h3>Nivel de Riesgo</h3>
      <div className="legend-items">
        {legendItems.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: getColorFromValue(item.value) }}
            ></div>
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapLegend
