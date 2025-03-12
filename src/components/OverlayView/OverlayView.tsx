import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useGoogleMapContext } from '../../context'
import { LatLng, OCType, PaneType } from '../../types'

import { getOverlayViewClass, type OverlayViewClass } from './OverlayViewClass'

export interface OverlayViewProps {
  pane?: PaneType
  position?: LatLng
  children?: React.ReactNode
  zIndex?: number

  clickable?: boolean
  draggable?: boolean
  onClick?: (event: google.maps.MapMouseEvent) => void
  onDragStart?: (position: google.maps.LatLng) => void
  onDragEnd?: (position: google.maps.LatLng) => void
}

export const OverlayView: OCType<OverlayViewProps> = (props) => {
  const { children, pane = 'overlayLayer', position, zIndex, clickable, draggable } = props
  const { map, maps } = useGoogleMapContext()
  const [view, setView] = useState<OverlayViewClass | null>(null)
  const container = view?.getElement()
  const OverlayViewClass = getOverlayViewClass(maps)

  useEffect(() => {
    const view = new OverlayViewClass({
      position,
      pane,
    })
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

    view.updatePosition(position)
  }, [view])

  useEffect(() => {
    if (!view) {
      return
    }

    const listeners: google.maps.MapsEventListener[] = []
    if (clickable && props.onClick) {
      listeners.push(maps.event.addListener(view, 'click', props.onClick))
    }

    // TODO: draggable

    return () => {
      listeners.forEach((l) => maps.event.removeListener(l))
    }
  }, [view, clickable, draggable])

  return container ? ReactDOM.createPortal(<>{children}</>, container) : null
}
