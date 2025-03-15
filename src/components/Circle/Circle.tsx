import React, { useEffect, useRef, useState } from 'react'

import { LatLng } from '../../types'
import { useGoogleMapContext } from '../../context'
import { getLatLngLiteral } from '../../utils/helper'

export type CircleDragMeta = { center: LatLng; radius: number }

export interface CircleProps {
  options?: Omit<google.maps.CircleOptions, 'map'>
  center?: LatLng
  radius?: number

  onClick?: (e: google.maps.MapMouseEvent) => void
  onChange?: (e: google.maps.MapMouseEvent, meta: CircleDragMeta) => void
  onDragStart?: (e: google.maps.MapMouseEvent) => void
  onDrag?: (e: google.maps.MapMouseEvent) => void
  onDragEnd?: (e: google.maps.MapMouseEvent, meta: CircleDragMeta) => void
}

export const Circle = (props: CircleProps) => {
  const { center, radius, options: circleOptions } = props
  const { map, maps } = useGoogleMapContext()
  const [circle, setCircle] = useState<google.maps.Circle | null>(null)

  useEffect(() => {
    const circle = new maps.Circle({ map })
    setCircle(circle)

    return () => {
      circle.setMap(null)
    }
  }, [map])

  useEffect(() => {
    if (!circle) {
      return
    }

    circle.setOptions({
      center,
      radius,
      ...circleOptions,
    })
  }, [circleOptions, center, radius, circle])

  // event
  useEffect(() => {
    if (!circle) {
      return
    }

    const listeners: google.maps.MapsEventListener[] = []
    if (circleOptions?.clickable && props.onClick) {
      listeners.push(
        circle.addListener('click', (e: google.maps.MapMouseEvent) => {
          props.onClick?.(e)
        }),
      )
    }
    if (circleOptions?.editable && props.onChange) {
      const handler = (e: google.maps.MapMouseEvent) => {
        const nextCenter = circle.getCenter()
        const nextRadius = circle.getRadius()
        props.onChange?.(e, {
          center: getLatLngLiteral(nextCenter),
          radius: nextRadius,
        })
      }
      listeners.push(
        circle.addListener('center_changed', handler),
        circle.addListener('radius_changed', handler),
      )
    }
    if (circleOptions?.draggable) {
      if (props.onDragStart) {
        listeners.push(
          circle.addListener('dragstart', (e: google.maps.MapMouseEvent) => {
            props.onDragStart?.(e)
          }),
        )
      }
      if (props.onDrag) {
        listeners.push(
          circle.addListener('drag', (e: google.maps.MapMouseEvent) => {
            props.onDrag?.(e)
          }),
        )
      }
      if (props.onDragEnd) {
        listeners.push(
          circle.addListener('dragend', (e: google.maps.MapMouseEvent) => {
            props.onDragEnd?.(e, {
              center: getLatLngLiteral(circle.getCenter()),
              radius: circle.getRadius(),
            })
          }),
        )
      }
    }

    return () => {
      listeners.forEach((l) => {
        maps.event.removeListener(l)
      })
    }
  }, [circle, circleOptions?.clickable, circleOptions?.editable, circleOptions?.draggable])

  return null
}
