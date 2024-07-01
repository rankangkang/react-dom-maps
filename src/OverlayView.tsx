import React, { useEffect, useImperativeHandle, useRef } from "react";
import ReactDOM from "react-dom";

import { useMapContext } from "./GoogleMap.context";
import {
  LatLng,
  OverlayComponentType,
  OverlayType,
  PaneType,
} from "./GoogleMap.types";

export interface OverlayViewProps {
  pane?: PaneType;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  children?: React.ReactNode;
  zIndex?: number;
}

/**
 * paneType zIndex seq
 * floatPane > overlayMouseTarget > markerLayer > overlayLayer > mapPane
 */

/**
 * render child element through google map OverlayView
 */
export const OverlayView: OverlayComponentType<
  OverlayViewProps,
  { overlayView?: google.maps.OverlayView }
> = React.forwardRef((props, ref) => {
  const { children, pane = "floatPane", position, zIndex } = props;
  const { map, maps } = useMapContext();
  const container = useRef<HTMLDivElement>(createContainerDiv({ pane }));
  const overlayViewRef = useRef<google.maps.OverlayView>();

  useImperativeHandle(ref, () => {
    return {
      overlayView: overlayViewRef.current,
    };
  });

  useEffect(() => {
    const overlayView = new (OverlayViewFactory())({
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

OverlayView.overlayType = OverlayType.OVERLAY_VIEW;
/**
 * create OverlayView factory class
 * @param maps
 * @returns
 */
export function OverlayViewFactory(maps: typeof google.maps = google.maps) {
  return class OverlayView extends maps.OverlayView {
    readonly container: HTMLDivElement;
    readonly position?: google.maps.LatLngLiteral | google.maps.LatLng;
    readonly pane: PaneType;

    constructor(config: {
      container: HTMLDivElement;
      position?: LatLng;
      pane: PaneType;
    }) {
      super();
      this.container = config.container;
      this.position = config.position;
      this.pane = config.pane;
    }

    onAdd() {
      const panes = this.getPanes();
      if (this.container && panes) {
        this.container.style.position = "absolute";
        panes[this.pane].appendChild(this.container);
      }
    }

    onRemove() {
      const container = this.container;
      if (container && container.parentNode) {
        maps.event.clearInstanceListeners(container);
        container.parentNode.removeChild(container);
      }
    }

    draw() {
      const container = this.container;
      if (container) {
        if (this.position) {
          const projection = this.getProjection();
          const positionPixel = projection.fromLatLngToDivPixel(
            new maps.LatLng(this.position),
          );
          if (positionPixel) {
            container.style.left = `${positionPixel.x}px`;
            container.style.top = `${positionPixel.y}px`;
          }
        } else {
          container.style.left = "0px";
          container.style.top = "0px";
        }
      }
    }
  };
}

export function createContainerDiv(
  options: { pane?: PaneType; className?: string } = {},
) {
  const { pane, className } = options;
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.classList.add("google-map-overlay");
  if (className) {
    div.classList.add(className);
  }
  if (pane) {
    div.classList.add(pane);
  }
  return div;
}
