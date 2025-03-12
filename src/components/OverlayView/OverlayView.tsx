import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useGoogleMapContext } from '../../context'
import { LatLng, GMAdapter, PaneType } from '../../types'

import { getOverlayViewClass, type OverlayViewClass } from './OverlayViewClass'
import { OverlayViewDraggable, OverlayViewOrigin, OverlayViewOriginOffset } from './types'

export interface OverlayViewProps extends OverlayViewDraggable {
  pane?: PaneType
  position: LatLng
  children?: React.ReactNode
  zIndex?: number
  origin?: OverlayViewOrigin
  originOffset?: OverlayViewOriginOffset

  clickable?: boolean
  onClick?: (event: google.maps.MapMouseEvent) => void
}

export const OverlayView: GMAdapter<OverlayViewProps> = (props) => {
  const {
    pane = 'overlayMouseTarget',
    position,
    zIndex,
    children,
    origin = 'center',
    originOffset = [0, 0],
    draggable = false,
    onDrag,
    onDragStart,
    onDragEnd,

    clickable,
    onClick,
  } = props
  const { map, maps } = useGoogleMapContext()
  const [view, setView] = useState<OverlayViewClass | null>(null)
  const container = view?.getElement()
  const OverlayViewClass = getOverlayViewClass(maps)

  useEffect(() => {
    const view = new OverlayViewClass()
    view.setMap(map)
    setView(view)
    return () => {
      view.setMap(null)
    }
  }, [map])

  useEffect(() => {
    if (!container) {
      return
    }
    container!.style.zIndex = `${zIndex}`
  }, [zIndex, container])

  useEffect(() => {
    if (!view) {
      return
    }

    view.setOptions({
      position,
      origin,
      originOffset,
      draggable: {
        draggable,
        onDrag,
        onDragStart,
        onDragEnd,
      },
    })
  }, [view, position, origin, originOffset, draggable, pane])

  useEffect(() => {
    if (!view) {
      return
    }

    const listeners: google.maps.MapsEventListener[] = []
    if (clickable && onClick) {
      listeners.push(maps.event.addListener(view, 'click', onClick))
    }

    return () => {
      listeners.forEach((l) => maps.event.removeListener(l))
    }
  }, [view, clickable])

  return container ? ReactDOM.createPortal(<>{children}</>, container) : null
}
