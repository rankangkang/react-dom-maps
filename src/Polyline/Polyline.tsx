import { noop } from "lodash";
import { FC, memo, useEffect, useState } from "react";

import { useGoogleMapContext } from "../GoogleMap.context";

const defaultOptions = {};

export interface PolylineProps {
  visible?: boolean;
  options?: Omit<google.maps.PolylineOptions, "path">;
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | (google.maps.LatLng | google.maps.LatLngLiteral)[];

  onMouseOut?: (e: google.maps.MapMouseEvent) => void;
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
}

export const Polyline: FC<PolylineProps> = (props) => {
  const { visible = true, options, path, onMouseOut, onMouseOver } = props;
  const { map } = useGoogleMapContext();
  const [instance, setInstance] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (instance) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);

  useEffect(() => {
    if (!instance) return noop;

    let listeners: google.maps.MapsEventListener[] = [];
    if (onMouseOut) {
      const l = google.maps.event.addListener(instance, "mouseout", onMouseOut);
      listeners.push(l);
    }
    if (onMouseOver) {
      const l = google.maps.event.addListener(
        instance,
        "mouseover",
        onMouseOver,
      );
      listeners.push(l);
    }
    return () => {
      listeners.forEach((l) => {
        google.maps.event.removeListener(l);
      });
    };
  }, [instance, onMouseOut, onMouseOver]);

  useEffect(() => {
    const polyline = new google.maps.Polyline(options ?? defaultOptions);
    path && polyline.setPath(path);
    polyline.setVisible(visible);
    polyline.setMap(map ?? null);
    setInstance(polyline);
    return () => {
      polyline.setMap(null);
    };
  }, [path, options, map]);

  return null;
};
