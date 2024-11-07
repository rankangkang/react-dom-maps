import React, { PropsWithChildren, useContext, createContext } from "react";

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

export const GoogleMapContextProvider: React.FC<
  PropsWithChildren<GoogleMapContextState>
> = (props) => {
  return (
    <GoogleMapContext.Provider value={{ map: props.map, maps: props.maps }}>
      {props.children}
    </GoogleMapContext.Provider>
  );
};

export function useGoogleMapContext() {
  const { map, maps } = useContext(GoogleMapContext);
  return { map, maps: maps! };
}
