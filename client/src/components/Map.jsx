import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import 'ol/ol.css'
import './Map.css'
import { Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, TileWMS, Vector as VectorSource } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import { Style, Fill, Stroke } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON'
import { getColorFromValue } from '../utils/colorUtils'
import { getDepartmentDataFromDB } from '../utils/departmentData'

const FloodMap = ({ searchQuery, selectedDepartment, onDepartmentSelect, onFirstResultChange, highlightedIndex, onResultsCountChange, onAllResultsChange }) => {
  const mapRef = useRef()
  const mapInstanceRef = useRef(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' })
  const [departmentData, setDepartmentData] = useState({})
  const [loading, setLoading] = useState(true)
  const [departmentsLoaded, setDepartmentsLoaded] = useState(false)
  const departmentsLayerRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const loadDepartmentData = async () => {
      try {
        const data = await getDepartmentDataFromDB()
        setDepartmentData(data)
        
        if (departmentsLayerRef.current) {
          departmentsLayerRef.current.getSource().changed()
        }
      } catch (error) {
        console.error('Error loading department data:', error)
        setDepartmentData({})
      }
    }

    loadDepartmentData()
  }, [])

  useEffect(() => {
    if (departmentsLoaded && Object.keys(departmentData).length > 0) {
      setLoading(false)
    }
  }, [departmentsLoaded, departmentData])

  useEffect(() => {
    const baseLayer = new TileLayer({
      source: new OSM()
    })

    const ignLayer = new TileLayer({
      source: new TileWMS({
        url: 'https://wms.ign.gob.ar/geoserver/ows',
        params: {
          'LAYERS': 'ign:hidrografia',
          'TILED': true,
          'FORMAT': 'image/png',
          'VERSION': '1.1.1'
        },
        serverType: 'geoserver',
        transition: 0
      }),
      opacity: 0.7
    })

    const departmentsSource = new VectorSource({
      url: '/departamentos.json',
      format: new GeoJSON()
    })

    departmentsSource.on('featuresloadend', () => {
      setDepartmentsLoaded(true)
    })

    departmentsSource.on('featuresloaderror', () => {
      console.error('Error loading departments GeoJSON')
      setDepartmentsLoaded(true) 
    })

    const departmentStyleFunction = (feature) => {
      const departmentId = feature.get('in1')
      const value = departmentData[departmentId] || null
      const fillColor = getColorFromValue(value)
      
      return new Style({
        fill: new Fill({
          color: fillColor + '80'
        }),
        stroke: new Stroke({
          color: '#333333',
          width: 1
        })
      })
    }

    const departmentsLayer = new VectorLayer({
      source: departmentsSource,
      style: departmentStyleFunction
    })
    
    departmentsLayerRef.current = departmentsLayer

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, ignLayer, departmentsLayer],
      view: new View({
        center: fromLonLat([-63.6167, -38.4161]),
        zoom: 5 
      })
    })

    mapInstanceRef.current = map

    map.on('pointermove', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer === departmentsLayer) {
          return feature
        }
        return null
      })

      if (feature) {
        const departmentId = feature.get('in1')
        const departmentName = feature.get('nam')
        const value = departmentData[departmentId] || null
        const formattedValue = value !== null ? `${(value * 100).toFixed(1)}%` : 'Sin datos'
        
        setTooltip({
          visible: true,
          x: evt.pixel[0],
          y: evt.pixel[1],
          content: `${departmentName}: ${formattedValue}`
        })
        
        map.getTargetElement().style.cursor = 'pointer'
      } else {
        setTooltip({ visible: false, x: 0, y: 0, content: '' })
        map.getTargetElement().style.cursor = 'default'
      }
    })

    return () => map.setTarget(null)
  }, [departmentData])

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery || !departmentsLayerRef.current) {
      setSearchResults([])
      setShowResults(false)
      onFirstResultChange?.(null)
      onResultsCountChange?.(0)
      onAllResultsChange?.([])
      return
    }

    const source = departmentsLayerRef.current.getSource()
    const features = source.getFeatures()
    
    if (features.length === 0) {
      return
    }

    // Function to normalize strings (remove accents and diacritics)
    const normalizeString = (str) => {
      return str
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    }

    const normalizedQuery = normalizeString(searchQuery)
    
    // Find all matching departments
    const matches = features
      .filter(feature => {
        const name = feature.get('nam') || ''
        const normalizedName = normalizeString(name)
        return normalizedName.includes(normalizedQuery)
      })
      .map(feature => ({
        name: feature.get('nam'),
        id: feature.get('in1'),
        feature: feature
      }))
      .slice(0, 10) // Limit to 10 results

    setSearchResults(matches)
    setShowResults(matches.length > 0)
    onFirstResultChange?.(matches[0] || null)
    onResultsCountChange?.(matches.length)
    onAllResultsChange?.(matches)
  }, [searchQuery, onFirstResultChange, onResultsCountChange, onAllResultsChange])

  // Handle selected department
  useEffect(() => {
    if (!selectedDepartment || !mapInstanceRef.current) {
      return
    }

    const extent = selectedDepartment.feature.getGeometry().getExtent()
    const view = mapInstanceRef.current.getView()
    
    view.fit(extent, {
      padding: [600, 600, 600, 600], // Padding around the department
      duration: 1000,
    })
  }, [selectedDepartment])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ 
        width: '100%', 
        height: '100vh',
        flex: 1
      }}></div>
      
      {loading && (
        <div className="map-loading">
          <div className="map-loading-spinner"></div>
          Cargando datos de inundaciones...
        </div>
      )}

      {/* Search results dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="search-results-dropdown">
          {searchResults.map((result, index) => (
            <div
              key={`${result.id}-${index}`}
              className={`search-result-item ${index === highlightedIndex ? 'highlighted' : ''}`}
              onClick={() => onDepartmentSelect(result)}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
      
      {tooltip.visible && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x + 10,
            top: tooltip.y - 30,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            whiteSpace: 'nowrap'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  )
}

FloodMap.propTypes = {
  searchQuery: PropTypes.string,
  selectedDepartment: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    feature: PropTypes.object
  }),
  onDepartmentSelect: PropTypes.func,
  onFirstResultChange: PropTypes.func,
  highlightedIndex: PropTypes.number,
  onResultsCountChange: PropTypes.func,
  onAllResultsChange: PropTypes.func
}

export default FloodMap
