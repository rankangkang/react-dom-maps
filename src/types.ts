import React from 'react'

export interface GoogleMapApi {
  map: google.maps.Map
  maps: typeof google.maps
}

export type LatLng = google.maps.LatLngLiteral

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

export type GMAdapter<
  Props,
  Ref extends { instance: any } | undefined = undefined,
> = Ref extends undefined
  ? React.ComponentType<Props>
  : React.ForwardRefExoticComponent<Props & React.RefAttributes<Ref>>
