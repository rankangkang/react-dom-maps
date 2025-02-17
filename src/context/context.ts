import { createContext } from "react";

export interface GoogleMapContextState {
  /** map instance */
  map?: google.maps.Map;
  /** google.maps object */
  maps?: typeof google.maps;
}

export const GoogleMapContext = createContext<GoogleMapContextState>({
  map: undefined,
  maps: undefined,
});
