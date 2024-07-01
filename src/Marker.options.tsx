import { useRef, useMemo, useEffect } from "react";
import ReactDOM from "react-dom";

import { PaneType, LatLng, Draggable } from "./GoogleMap.types";
import { getLatLngLiteral, noop } from "./GoogleMap.utils";
import { MarkerDraggable, MarkerOrigin } from "./Marker.types";
import { createContainerDiv, OverlayViewFactory } from "./OverlayView";
import { useMapContext } from "./GoogleMap.context";

export interface OverlayProps extends MarkerDraggable {
  pane?: PaneType;
  position: LatLng;
  zIndex?: number;
  origin?: MarkerOrigin;
  children: React.ReactNode;
}

/**
 * MarkerOverlay for marker
 * @param props
 * @returns
 */
export const MarkerOverlay: React.FC<OverlayProps> = (props) => {
  const {
    pane = "overlayMouseTarget",
    position,
    zIndex,
    children,
    origin = "center",
    draggable = false,
    onDrag,
    onDragStart,
    onDragEnd,
  } = props;
  const { map, maps } = useMapContext();
  const container = useRef<HTMLDivElement>(
    createContainerDiv({ pane, className: "marker-overlay" }),
  );
  const overlay = useMemo(() => {
    return new (MarkerOverlayFactory())({
      container: container.current,
      pane,
      position,
      origin,
      draggable,
      onDrag,
      onDragEnd,
      onDragStart,
    });
  }, [
    map,
    maps,
    pane,
    position,
    origin,
    draggable,
    onDrag,
    onDragStart,
    onDragEnd,
  ]);

  useEffect(() => {
    container.current.style.zIndex = String(zIndex);
  }, [zIndex]);

  useEffect(() => {
    if (overlay && !overlay.getMap() && map) {
      overlay.setMap(map);
      return () => {
        overlay.setMap(null);
      };
    }

    return noop;
  }, [map, overlay]);

  return ReactDOM.createPortal(children, container.current);
};

function MarkerOverlayFactory(maps: typeof google.maps = google.maps) {
  return class OverlayView extends OverlayViewFactory(maps) {
    public readonly container: HTMLDivElement;
    public readonly position: LatLng;
    public readonly pane: PaneType;
    public readonly origin: MarkerOrigin;
    public readonly draggable?: MarkerDraggable["draggable"];
    public readonly onDrag?: MarkerDraggable["onDrag"];
    public readonly onDragStart?: MarkerDraggable["onDragStart"];
    public readonly onDragEnd?: MarkerDraggable["onDragEnd"];
    private prevPxPos: { x: number; y: number } | null = null; // 上一事件触发位置，单位是像素
    private isRemoved = false; // 是否已被移除

    constructor(
      option: {
        container: HTMLDivElement;
        position: LatLng;
        pane: PaneType;
        origin: MarkerOrigin;
      } & Draggable,
    ) {
      super(option);
      this.container = option.container;
      this.position = option.position;
      this.pane = option.pane;
      this.origin = option.origin;
      this.draggable = option.draggable;
      this.onDrag = option.onDrag;
      this.onDragStart = option.onDragStart;
      this.onDragEnd = option.onDragEnd;
    }

    draw() {
      const projection = this.getProjection();
      if (!projection) {
        return;
      }
      const point = projection.fromLatLngToDivPixel(this.position);
      if (!point) {
        return;
      }

      const offsetX = this.container.offsetWidth;
      const offsetY = this.container.offsetHeight;
      if (this.origin === "bottomCenter") {
        this.container.style.transform = `translate(${
          point.x - offsetX / 2
        }px, ${point.y - offsetY}px)`;
      } else {
        // default center
        this.container.style.transform = `translate(${
          point.x - offsetX / 2
        }px, ${point.y - offsetY / 2}px)`;
      }
    }

    private _map() {
      // same as this.getMap()
      return this.get("map");
    }

    private _div() {
      return (this.getMap() as google.maps.Map)?.getDiv();
    }

    onAdd() {
      super.onAdd();

      if (!this.container || !this.draggable) {
        return;
      }

      this._div()?.addEventListener("mouseleave", () => {
        maps.event.trigger(this.container, "mouseup");
      });

      this.container.addEventListener("mousedown", this.onMouseDown);
      this.container.addEventListener("mouseup", this.onMouseUp);
      this.isRemoved = false;
    }

    onRemove() {
      super.onRemove();
      this._map()?.set("draggable", true);
      this.isRemoved = true;
    }

    onMouseDown = (e: MouseEvent) => {
      if (this.isRemoved) {
        return;
      }
      this.container.style.cursor = "grabbing";
      this._map()?.set("draggable", false);
      this.prevPxPos = { x: e.clientX, y: e.clientY };
      this.onDragStart?.(e, { latlng: getLatLngLiteral(this.position) });
      this._div()?.addEventListener("mousemove", (e: MouseEvent) => {
        if (!this.prevPxPos) {
          return;
        }
        const currPxPos = this.getProjection()?.fromLatLngToDivPixel(
          this.position,
        );
        if (!currPxPos) {
          return;
        }
        const dx = this.prevPxPos.x - e.clientX;
        const dy = this.prevPxPos.y - e.clientY;
        const nextPixel = new maps.Point(currPxPos.x - dx, currPxPos.y - dy);
        const nextPosition =
          this.getProjection().fromDivPixelToLatLng(nextPixel);
        // euqals to this.position = nextPosition
        this.set("position", nextPosition);
        this.prevPxPos = { x: e.clientX, y: e.clientY };
        this.draw();
        this.onDrag?.(e, { latlng: getLatLngLiteral(nextPosition!) });
      });
    };

    onMouseUp = (e: MouseEvent) => {
      if (this.isRemoved) {
        return;
      }
      this._map()?.set("draggable", true);
      this.container.style.cursor = "default";
      this.set("position", this.position);
      this.prevPxPos = null;
      this.draw();
      this.onDragEnd?.(e, { latlng: getLatLngLiteral(this.position) });
    };
  };
}
