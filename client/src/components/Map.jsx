import { useEffect, useRef } from 'react'
import 'ol/ol.css'
import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { OSM, TileWMS } from 'ol/source'
import { fromLonLat } from 'ol/proj'

const FloodMap = () => {
  const mapRef = useRef()

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

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, ignLayer],
      view: new View({
        center: fromLonLat([-58.3816, -34.6037]), // Buenos Aires
        zoom: 6
      })
    })

    return () => map.setTarget(null)
  }, [])

  return (
    <div ref={mapRef} style={{ 
      width: '100%', 
      height: '100vh',
      flex: 1
    }}></div>
  )
}

export default FloodMap
