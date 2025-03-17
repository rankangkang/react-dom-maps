import { createContext } from 'react'

export interface MapContextState {
  /** map instance */
  map?: google.maps.Map
  /** google.maps object */
  maps?: typeof google.maps
}

export const MapContext = createContext<MapContextState>({
  map: undefined,
  maps: undefined,
})
