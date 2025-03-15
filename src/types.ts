import React from 'react'

export interface GoogleMapApi {
  map: google.maps.Map
  maps: typeof google.maps
}

export type LatLng = google.maps.LatLngLiteral | google.maps.LatLng

/**
 * paneType z-index sequence: floatPane > overlayMouseTarget > markerLayer > overlayLayer > mapPane
 */
export type PaneType = keyof NonNullable<google.maps.MapPanes>

export type Draggable<T = any> = {
  /** if set true, element is draggable */
  draggable?: boolean
  onDrag?(e: MouseEvent, params: T): void
  onDragStart?(e: MouseEvent, params: T): void
  onDragEnd?(e: MouseEvent, params: T): void
}

export enum MapsEvent {
  Click = 'click',
  DblClick = 'dblclick',
  RightClick = 'rightclick',

  Drag = 'drag',
  DragEnd = 'dragend',
  DragStart = 'dragstart',

  MouseDown = 'mousedown',
  MouseMove = 'mousemove',
  MouseOut = 'mouseout',
  MouseOver = 'mouseover',
  MouseUp = 'mouseup',

  /**
   * circle event
   */
  CenterChanged = 'center_changed',
  /**
   * circle event
   */
  RadiusChanged = 'radius_changed',
}

export type MapsEventHandler<D extends any[] = [], Event = google.maps.MapMouseEvent> = (
  e: Event,
  ...args: D
) => void
