import React, { ReactNode } from 'react'

import { GoogleMap } from '../../src/GoogleMap'
import { UseGoogleMapOptions, useGoogleMap } from '../../src/useGoogleMap'

export const defaultOptions: UseGoogleMapOptions = {
  loader: {
    // apiKey: GOOGLE_MAP_API_KEY,
    // @ts-expect-error
    apiKey: undefined,
  },
  map: {
    mapTypeId: 'roadmap',
    center: {
      lat: 22.3193,
      lng: 114.1694,
    },
    zoom: 12,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    disableDefaultUI: true,
  },
}

export const ExampleContainer = (props: { children?: ReactNode }) => {
  const { api, ref } = useGoogleMap(defaultOptions)
  return (
    <div className="w-full h-[600px]">
      <GoogleMap className="w-full h-full relative" api={api} containerRef={ref}>
        {props.children}
      </GoogleMap>
    </div>
  )
}
