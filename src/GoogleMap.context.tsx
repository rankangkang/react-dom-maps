import React, { useContext } from "react";

export interface MapContextState {
  map?: google.maps.Map;
  maps?: typeof google.maps;
}

export const MapContext = React.createContext<MapContextState>({
  map: undefined,
  maps: undefined,
});

export const MapContextProvider: React.FC<{
  map: google.maps.Map;
  maps: typeof google.maps;
  children?: React.ReactNode;
}> = (props) => {
  const { map, maps, children } = props;
  return (
    <MapContext.Provider value={{ map, maps }}>{children}</MapContext.Provider>
  );
};

export function useMapContext() {
  const { map, maps } = useContext(MapContext);
  return {
    map: map!,
    maps: maps!,
  };
}
