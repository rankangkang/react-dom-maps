import { Draggable, WithOverlayType } from "./GoogleMap.types";

export type MarkerOrigin = "center" | "bottomCenter";

export type MarkerDraggable = Draggable<{
  latlng: { lat: number; lng: number };
}>;
