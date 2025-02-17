import { useContext } from "react";
import { GoogleMapContext } from "./context";

export function useGoogleMapContext() {
  const { map, maps } = useContext(GoogleMapContext);
  return { map, maps: maps! };
}
