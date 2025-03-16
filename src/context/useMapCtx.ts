import { useContext } from 'react'

import { MapContext } from './context'

/**
 * use GoogleMap context, you should use it inside `<GoogleMap />` components
 * @returns
 */
export function useMapCtx() {
  const { map, maps } = useContext(MapContext)
  return { map: map!, maps: maps! }
}
