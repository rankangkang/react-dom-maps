import { noop } from 'lodash'
import { FC, useEffect, useState } from 'react'

import { useGoogleMapContext } from '../../context'
import { getLatLngLiteral } from '../../utils/helper'
import { LatLng } from '../../types'

export interface PolylineProps {
  options?: Omit<google.maps.PolylineOptions, 'map'>
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | (google.maps.LatLng | google.maps.LatLngLiteral)[]

  onMouseOut?: (e: google.maps.MapMouseEvent) => void
  onMouseOver?: (e: google.maps.MapMouseEvent) => void

  onClick?: (e: google.maps.MapMouseEvent) => void
  onChange?: (e: google.maps.MapMouseEvent, nextPath?: LatLng[]) => void
  onDragStart?: (e: google.maps.MapMouseEvent) => void
  onDrag?: (e: google.maps.MapMouseEvent) => void
  onDragEnd?: (e: google.maps.MapMouseEvent, paths?: LatLng[]) => void
}

export const Polyline: FC<PolylineProps> = (props) => {
  const { options: polylineOptions, path } = props
  const { map } = useGoogleMapContext()
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null)

  useEffect(() => {
    const polyline = new google.maps.Polyline({ map })
    setPolyline(polyline)
    return () => {
      polyline.setMap(null)
    }
  }, [map])

  useEffect(() => {
    if (!polyline) return

    polyline.setOptions({
      path,
      ...polylineOptions,
    })
  }, [polylineOptions, path, polyline])

  // events
  useEffect(() => {
    if (!polyline) return noop

    let listeners: google.maps.MapsEventListener[] = []

    // mouse over && mouse out for hover
    if (props?.onMouseOut) {
      listeners.push(google.maps.event.addListener(polyline, 'mouseout', props.onMouseOut))
    }
    if (props?.onMouseOver) {
      listeners.push(google.maps.event.addListener(polyline, 'mouseover', props.onMouseOver))
    }

    if (polylineOptions?.clickable && props.onClick) {
      listeners.push(google.maps.event.addListener(polyline, 'click', props.onClick))
    }
    if (polylineOptions?.editable && props.onChange) {
      const handler = (e: google.maps.MapMouseEvent) => {
        const nextPath = polyline.getPath().getArray().map(getLatLngLiteral)
        props.onChange?.(e, nextPath)
      }
      listeners.push(
        // google.maps.event.addListener(polyline.getPath(), "set_at", handler),
        google.maps.event.addListener(polyline.getPath(), 'insert_at', handler),
        google.maps.event.addListener(polyline.getPath(), 'remove_at', handler),
      )
    }
    if (polylineOptions?.draggable) {
      if (props.onDragStart) {
        listeners.push(google.maps.event.addListener(polyline, 'dragstart', props.onDragStart))
      }
      if (props.onDrag) {
        listeners.push(google.maps.event.addListener(polyline, 'drag', props.onDrag))
      }
      if (props.onDragEnd) {
        listeners.push(
          google.maps.event.addListener(polyline, 'dragend', (e: google.maps.MapMouseEvent) => {
            const nextPath = polyline.getPath().getArray().map(getLatLngLiteral)
            props.onDragEnd?.(e, nextPath)
          }),
        )
      }
    }

    return () => {
      listeners.forEach((l) => {
        google.maps.event.removeListener(l)
      })
    }
  }, [polyline, polylineOptions?.clickable, polylineOptions?.editable, polylineOptions?.draggable])

  return null
}
