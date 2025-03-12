import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useGoogleMapContext } from '../../context'
import { LatLng, OCType, PaneType } from '../../types'

import { getOverlayClass, type OverlayClass } from './OverlayClass'

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

export const Overlay: OCType<OverlayViewProps> = (props) => {
  const { children, pane = 'overlayLayer', position, zIndex, clickable, draggable } = props
  const { map, maps } = useGoogleMapContext()
  const [overlay, setOverlay] = useState<OverlayClass | null>(null)
  const container = overlay?.getElement()

  const OverlayClass = getOverlayClass(maps)

  useEffect(() => {
    const overlay = new OverlayClass({
      position,
      pane,
    })
    overlay.setMap(map)
    setOverlay(overlay)
    return () => {
      overlay.setMap(null)
    }
  }, [map])

  useEffect(() => {
    if (overlay) {
      container!.style.zIndex = `${zIndex}`
      overlay?.updatePosition(position)
    }
  }, [zIndex, position, overlay])

  useEffect(() => {
    if (!overlay) {
      return
    }

    const listeners: google.maps.MapsEventListener[] = []
    if (clickable && props.onClick) {
      listeners.push(maps.event.addListener(overlay, 'click', props.onClick))
    }

    // TODO: draggable

    return () => {
      listeners.forEach((l) => maps.event.removeListener(l))
    }
  }, [overlay, clickable, draggable])

  return container ? ReactDOM.createPortal(<>{children}</>, container) : null
}
