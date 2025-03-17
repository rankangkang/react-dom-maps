import React, { PropsWithChildren } from 'react'

import { MapContextState, MapContext } from './context'

export const Provider: React.FC<PropsWithChildren<MapContextState>> = (props) => {
  return (
    <MapContext.Provider value={{ map: props.map, maps: props.maps }}>
      {props.children}
    </MapContext.Provider>
  )
}
