import React, { useEffect, useImperativeHandle, useRef } from "react";
import ReactDOM from "react-dom";

import { useGoogleMapContext } from "../GoogleMap.context";
import { LatLng, OCType, PaneType } from "../GoogleMap.types";
import { createContainerDiv } from "../utils/dom";

import { createOverlayView } from "./createOverlayView";

export interface OverlayViewProps {
  pane?: PaneType;
  position?: LatLng;
  children?: React.ReactNode;
  zIndex?: number;
}

/** Render child element through GoogleMap OverlayView */
export const OverlayView: OCType<
  OverlayViewProps,
  { overlayView?: google.maps.OverlayView }
> = React.forwardRef((props, ref) => {
  const { children, pane = "floatPane", position, zIndex } = props;
  const { map, maps } = useGoogleMapContext();
  const container = useRef<HTMLDivElement>(createContainerDiv({ pane }));
  const overlayViewRef = useRef<google.maps.OverlayView>();

  useImperativeHandle(ref, () => {
    return {
      overlayView: overlayViewRef.current,
    };
  });

  useEffect(() => {
    const overlayView = new (createOverlayView(maps))({
      container: container.current,
      position,
      pane,
    });
    overlayView.setMap(map);
    overlayViewRef.current = overlayView;

    return () => {
      overlayView.setMap(null);
    };
  }, [map, maps, container.current, position, pane]);

  useEffect(() => {
    if (container.current) {
      container.current.style.zIndex = `${zIndex}`;
    }
  }, [zIndex]);

  return ReactDOM.createPortal(<>{children}</>, container.current);
});
