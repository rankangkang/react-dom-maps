import React, { PropsWithChildren } from 'react'

import { GoogleMapContextState, GoogleMapContext } from './context'

export const GoogleMapContextProvider: React.FC<PropsWithChildren<GoogleMapContextState>> = (
  props,
) => {
  return (
    <GoogleMapContext.Provider value={{ map: props.map, maps: props.maps }}>
      {props.children}
    </GoogleMapContext.Provider>
  )
}
