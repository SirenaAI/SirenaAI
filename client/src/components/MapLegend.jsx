import { getColorFromValue } from '../utils/colorUtils'
import { useLanguage } from '../hooks/useLanguage'
import './MapLegend.css'

const MapLegend = () => {
  const { t } = useLanguage()

  const legendItems = [
    { value: 1, label: t('mapLegend.high') },
    { value: 0.75, label: t('mapLegend.mediumHigh') },
    { value: 0.5, label: t('mapLegend.medium') },
    { value: 0.25, label: t('mapLegend.lowMedium') },
    { value: 0, label: t('mapLegend.low') },
    { value: null, label: t('mapLegend.noData') }
  ]

  return (
    <div className="map-legend">
      <h3>{t('mapLegend.title')}</h3>
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
