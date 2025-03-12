import { useState } from 'react'

import { useGoogleMap, GoogleMap, Polyline, Polygon, Circle } from '../../src'

import { BottomCenterControl } from './components/Control'
import { Marker } from './components/Marker'
import { defaultOptions } from './config'

// 一些列香港经纬度
const latLngAroundHK = [
  { lat: 22.3193, lng: 114.1694 },
  { lat: 22.3027, lng: 114.1772 },
  { lat: 22.2855, lng: 114.1577 },
  { lat: 22.3364, lng: 114.1747 },
  { lat: 22.2783, lng: 114.1747 },
  { lat: 22.3072, lng: 114.2551 },
  { lat: 22.3964, lng: 114.1095 },
  { lat: 22.3193, lng: 114.2115 },
  { lat: 22.3701, lng: 114.1142 },
]

const polygonLatLngs = [
  { lat: 22.4, lng: 114 },
  { lat: 22.4, lng: 114.2 },
  { lat: 22.42, lng: 114.2 },
  { lat: 22.42, lng: 114 },
]

const polygonOptions = {
  strokeColor: '#0000ce',
  editable: true,
  draggable: true,
}

const polylineLatLngs = [
  { lat: 22.3193, lng: 114.2115 },
  { lat: 22.3193, lng: 114.1694 },
  { lat: 22.2855, lng: 114.1577 },
  { lat: 22.3964, lng: 114.1095 },
  { lat: 22.3701, lng: 114.1142 },
]

const polylineOptions = {
  strokeColor: '#fefefe',
  strokeOpacity: 0.5,
  clickable: true,
  editable: true,
  draggable: true,
}

const circleOptions = {
  center: { lat: 22.3193, lng: 114.1694 },
  radius: 10000,
  draggable: true,
  editable: true,
  clickable: true,
}

function App() {
  const { api, ref } = useGoogleMap(defaultOptions)
  const [visible, setVisible] = useState<boolean>(true)

  return (
    <div className="w-full h-full">
      <GoogleMap className="w-full h-full relative" api={api} containerRef={ref}>
        <BottomCenterControl
          onZoomIn={() => {
            if (api?.map) {
              api.map.setZoom(api.map.getZoom()! + 1)
            }
          }}
          onZoomOut={() => {
            if (api?.map) {
              api.map.setZoom(api.map.getZoom()! - 1)
            }
          }}
          onBackCenter={() => {
            if (api?.map) {
              const bounds = new api.maps.LatLngBounds()
              latLngAroundHK.forEach((latLng) => {
                bounds.extend(latLng)
              })
              api.map.fitBounds(bounds)
            }
          }}
          onToggleRoute={() => {
            setVisible((v) => !v)
          }}
        />
        {latLngAroundHK.map((latLng, idx) => (
          <Marker {...latLng} key={idx} origin="bottomCenter" originOffset={[0, 6]} />
        ))}
        {visible && (
          <>
            <Polyline
              path={polylineLatLngs}
              options={polylineOptions}
              onClick={() => {
                console.log('polyline click')
              }}
              onChange={(_, nextPath) => {
                console.log('polyline change', nextPath)
              }}
              onDragEnd={(_, nextPath) => {
                console.log('polyline dragEnd', nextPath)
              }}
            />
            <Polygon
              paths={polygonLatLngs}
              options={polygonOptions}
              onChange={(_, nextPaths) => {
                console.log('polygon change', nextPaths)
              }}
              onDragEnd={(_, nextPaths) => {
                console.log('polygon dragEnd', nextPaths)
              }}
            />
            <Circle
              options={circleOptions}
              onDragEnd={(_, nextMeta) => {
                console.log('circle drag end', nextMeta)
              }}
              onClick={(e) => {
                console.log('circle click', e)
              }}
              onChange={(_, nextMeta) => {
                console.log('circle change', nextMeta)
              }}
            />
          </>
        )}
      </GoogleMap>
    </div>
  )
}

export default App
