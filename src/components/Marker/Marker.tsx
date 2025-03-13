import { isNumber, omit } from 'lodash'
import React, { FC, PropsWithChildren, ReactNode, memo, useMemo } from 'react'

import {
  OverlayViewDraggable,
  OverlayViewOrigin,
  OverlayViewOriginOffset,
} from '../OverlayView/types'
import { OverlayView } from '../OverlayView'
import { LatLng } from '../../types'

export interface MarkerProps {
  /** latitude */
  lat: number
  /** longitude */
  lng: number
  /** z-index */
  zIndex?: number
  /** marker origin */
  origin?: OverlayViewOrigin
  /** marker origin offset */
  originOffset?: number | OverlayViewOriginOffset
  /** your custom marker element */
  children?: ReactNode

  /** if set true, element is draggable */
  draggable?: boolean
  /** drag event callback */
  onDrag?(e: MouseEvent, data: { latlng: LatLng }): void
  /** dragstart event callback */
  onDragStart?(e: MouseEvent, data: { latlng: LatLng }): void
  /** dragend event callback */
  onDragEnd?(e: MouseEvent, data: { latlng: LatLng }): void
}

/**
 * Display custom marker on map
 */
export const Marker = (props: MarkerProps) => {
  if (!React.isValidElement(props.children)) {
    return null
  }

  const { lat, lng, originOffset = [0, 0], ...rest } = props
  const position = useMemo(() => ({ lat, lng }), [lat, lng])
  const nextOriginOffset: OverlayViewOriginOffset = isNumber(originOffset)
    ? [originOffset, originOffset]
    : originOffset

  return (
    <OverlayView pane="floatPane" position={position} originOffset={nextOriginOffset} {...rest}>
      {props.children}
    </OverlayView>
  )
}
