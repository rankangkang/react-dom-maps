import React from "react";

export interface GoogleMapApi {
  map: google.maps.Map;
  maps: typeof google.maps;
}

export type LatLng = google.maps.LatLng | google.maps.LatLngLiteral;

export type PaneType = keyof NonNullable<google.maps.MapPanes>;

// 叠加层类型
export enum OverlayType {
  MARKER = "marker",
  OVERLAY_VIEW = "overlayView",
  // TODO: 后续可扩展 polyline、polygon、circle 等组件
}

export type Draggable<T = any> = {
  draggable?: boolean;
  onDrag?(e: MouseEvent, params: T): void;
  onDragStart?(e: MouseEvent, params: T): void;
  onDragEnd?(e: MouseEvent, params: T): void;
};

export type WithOverlayType<T> = T & {
  overlayType?: OverlayType;
};

export type OverlayComponentType<Props, Ref = undefined> = Ref extends undefined
  ? WithOverlayType<React.ComponentType<Props>>
  : WithOverlayType<
      React.ForwardRefExoticComponent<Props & React.RefAttributes<Ref>>
    >;
