import { Draggable, LatLng } from '../../types'

export type OverlayViewDraggable = Draggable<{ latlng: LatLng }>

export type OverlayViewOrigin = 'center' | 'bottomCenter'

export type OverlayViewOriginOffset = [number, number]
