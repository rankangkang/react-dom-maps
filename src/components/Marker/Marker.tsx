import { isNumber, omit } from 'lodash'
import React, { FC, PropsWithChildren, memo, useMemo } from 'react'

import {
  OverlayViewDraggable,
  OverlayViewOrigin,
  OverlayViewOriginOffset,
} from '../OverlayView/types'
import { OverlayView } from '../OverlayView'
import { GMAdapter } from '../../types'

export interface MarkerProps extends OverlayViewDraggable {
  lat: number
  lng: number
  zIndex?: number
  origin?: OverlayViewOrigin
  originOffset?: number | OverlayViewOriginOffset
}

/**
 * use Marker to wrap your marker icon
 * @param props
 * @returns
 */
export const Marker: GMAdapter<PropsWithChildren<MarkerProps>> = (props) => {
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
