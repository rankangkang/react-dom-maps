import { PropsWithChildren, useEffect, useMemo, useRef, FC } from "react";
import { createPortal } from "react-dom";
import { noop } from "lodash";

import { useGoogleMapContext } from "../GoogleMap.context";
import { Draggable, LatLng, PaneType } from "../GoogleMap.types";
import { createOverlayView } from "../Overlay/createOverlayView";
import { createContainerDiv, getLatLngLiteral } from "../utils/dom";

import {
  MarkerDraggable,
  MarkerOrigin,
  MarkerOriginOffset,
} from "./Marker.types";

export interface MarkerOverlayProps extends MarkerDraggable {
  pane?: PaneType;
  position: LatLng;
  zIndex?: number;
  origin?: MarkerOrigin;
  originOffset?: MarkerOriginOffset;
}

/**
 * MarkerOverlay for marker
 * @param props
 * @returns
 */
export const MarkerOverlay: FC<PropsWithChildren<MarkerOverlayProps>> = (
  props,
) => {
  const {
    pane = "overlayMouseTarget",
    position,
    zIndex,
    children,
    origin = "center",
    originOffset = [0, 0],
    draggable = false,
    onDrag,
    onDragStart,
    onDragEnd,
  } = props;
  const { map, maps } = useGoogleMapContext();
  const container = useRef<HTMLDivElement>(createContainerDiv({ pane }));
  const overlay = useMemo(() => {
    return new (MarkerOverlayFactory(maps))({
      container: container.current,
      pane,
      position,
      origin,
      originOffset,
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
    originOffset,
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

  return createPortal(children, container.current);
};

function MarkerOverlayFactory(maps: typeof google.maps = google.maps) {
  return class OverlayView extends createOverlayView(maps) {
    public readonly container: HTMLDivElement;
    public readonly position: LatLng;
    public readonly pane: PaneType;
    public readonly origin: MarkerOrigin;
    public readonly originOffset: MarkerOriginOffset;
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
        originOffset?: MarkerOriginOffset;
      } & Draggable,
    ) {
      super(option);
      this.container = option.container;
      this.position = option.position;
      this.pane = option.pane;
      this.origin = option.origin;
      this.originOffset = option.originOffset || [0, 0];
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

      const [ox, oy] = this.originOffset;
      const offsetX = this.container.offsetWidth;
      const offsetY = this.container.offsetHeight;
      if (this.origin === "bottomCenter") {
        this.container.style.transform = `translate(${point.x - offsetX / 2 + ox}px, ${point.y - offsetY + oy}px)`;
      } else {
        // default center
        this.container.style.transform = `translate(${point.x - offsetX / 2 + ox}px, ${point.y - offsetY / 2 + oy}px)`;
      }
    }

    private _map() {
      // equals to `this.getMap()`
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

      this._div()?.addEventListener("mouseleave", this.triggerMouseUp);
      this.container.addEventListener("mousedown", this.onMouseDown);
      this.container.addEventListener("mouseup", this.onMouseUp);
      this.isRemoved = false;
    }

    onRemove() {
      this._map()?.set("draggable", true);
      this.isRemoved = true;
      try {
        // NOTE: remove 时，this._div() 返回值为 null
        this._div()?.removeEventListener("mouseleave", this.triggerMouseUp);
        this.container?.removeEventListener("mousedown", this.onMouseDown);
        this.container?.removeEventListener("mouseup", this.onMouseUp);
      } catch (e) {}
      super.onRemove();
    }

    triggerMouseUp = () => {
      maps.event.trigger(this.container, "mouseup");
    };

    onMouseDown = (e: MouseEvent) => {
      if (this.isRemoved) {
        return;
      }
      // 鼠标按下，marker 处于拖拽状态，通过鼠标移动的位移反向计算移动后的经纬度
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
          this.getProjection()?.fromDivPixelToLatLng(nextPixel);
        // euqals to `this.position = nextPosition`
        this.set("position", nextPosition);
        this.prevPxPos = { x: e.clientX, y: e.clientY };
        this.draw();
        this.onDrag?.(e, { latlng: getLatLngLiteral(nextPosition) });
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
