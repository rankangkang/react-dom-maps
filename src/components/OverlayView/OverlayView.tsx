import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useGoogleMapContext } from '../../context'
import { LatLng, PaneType } from '../../types'
import { createContainerDiv } from '../../utils/dom'

import { getOverlayViewClass, type OverlayViewClass } from './OverlayViewClass'
import { OverlayViewDraggable, OverlayViewOrigin, OverlayViewOriginOffset } from './types'

export interface OverlayViewProps extends OverlayViewDraggable {
  className?: string
  pane?: PaneType
  position: LatLng
  children?: React.ReactNode
  zIndex?: number
  origin?: OverlayViewOrigin
  originOffset?: OverlayViewOriginOffset

  clickable?: boolean
  onClick?: (event: google.maps.MapMouseEvent) => void
}

export const OverlayView = (props: OverlayViewProps) => {
  const {
    className,
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
  const container = useCreateContainer([pane, className].filter(Boolean).join(' '))
  const OverlayViewClass = getOverlayViewClass(maps)

  useEffect(() => {
    const view = new OverlayViewClass({
      container,
      position,
      pane,
      origin,
      originOffset,
      draggable: {
        draggable,
        onDrag,
        onDragStart,
        onDragEnd,
      },
    })
    view.setMap(map)

    view.getElement().style.zIndex = typeof zIndex === 'number' ? String(zIndex) : (zIndex ?? '0')

    const listeners: google.maps.MapsEventListener[] = []
    if (clickable && onClick) {
      listeners.push(maps.event.addListener(view, 'click', onClick))
    }

    return () => {
      view.setMap(null)
      listeners.forEach((l) => maps.event.removeListener(l))
    }
  }, [container, position, origin, originOffset, draggable, pane, zIndex, clickable])

  return container ? ReactDOM.createPortal(<>{children}</>, container) : null
}

function useCreateContainer(className: string) {
  const container = useMemo(() => {
    return createContainerDiv({ className })
  }, [className])

  return container
}
