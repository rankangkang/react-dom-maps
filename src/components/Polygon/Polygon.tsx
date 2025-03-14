import React, { memo, useEffect, useRef, useState } from 'react'

import { useGoogleMapContext } from '../../context'
import { GMAdapter, LatLng } from '../../types'
import { getLatLngLiteral } from '../../utils/helper'

export interface PolygonProps {
  /** polygon coordinates */
  paths?: LatLng[]
  /** google map polygon options */
  options?: Omit<google.maps.PolygonOptions, 'map'>
  /** click event callback */
  onClick?: (e: google.maps.MapMouseEvent) => void
  /** change event callback, will be fired when polygon paths changed */
  onChange?: (e: google.maps.MapMouseEvent, nextPaths?: LatLng[]) => void
  /** dragstart event callback */
  onDragStart?: (e: google.maps.MapMouseEvent) => void
  /** drag event callback */
  onDrag?: (e: google.maps.MapMouseEvent) => void
  /** dragend event callback */
  onDragEnd?: (e: google.maps.MapMouseEvent, paths?: LatLng[]) => void
}

export const Polygon = (props: PolygonProps) => {
  const { paths, options: polygonOptions } = props
  const { map, maps } = useGoogleMapContext()

  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null)

  useEffect(() => {
    const polygon = new maps.Polygon({
      map,
    })
    setPolygon(polygon)
    return () => {
      polygon?.setMap(null)
    }
  }, [map])

  useEffect(() => {
    if (!polygon) {
      return
    }

    polygon.setOptions({
      paths,
      ...polygonOptions,
    })
  }, [polygonOptions, paths, polygon])

  // event
  useEffect(() => {
    if (!polygon) {
      return
    }

    const listeners: google.maps.MapsEventListener[] = []
    if (polygonOptions?.clickable && props.onClick) {
      const clickListener = polygon.addListener('click', (e: google.maps.MapMouseEvent) => {
        props.onClick?.(e)
      })
      listeners.push(clickListener)
    }

    if (polygonOptions?.editable && props.onChange) {
      const handler = (e: google.maps.MapMouseEvent) => {
        const nextPaths = polygon
          .getPath()
          .getArray()
          .map((latLng) => ({
            latitude: latLng.lat(),
            longitude: latLng.lng(),
          }))
          .map(getLatLngLiteral)

        props.onChange?.(e, nextPaths)
      }

      listeners.push(
        // polygon.getPath().addListener("set_at", handler),
        polygon.getPath().addListener('insert_at', handler),
        polygon.getPath().addListener('remove_at', handler),
      )
    }

    if (polygonOptions?.draggable) {
      if (props.onDragStart) {
        listeners.push(
          polygon.addListener('dragstart', (e: google.maps.MapMouseEvent) => {
            props.onDragStart?.(e)
          }),
        )
      }

      if (props.onDrag) {
        listeners.push(
          polygon.addListener('drag', (e: google.maps.MapMouseEvent) => {
            props.onDrag?.(e)
          }),
        )
      }

      if (props.onDragEnd) {
        listeners.push(
          polygon.addListener('dragend', (e: google.maps.MapMouseEvent) => {
            // 获取更新后的全部路径坐标
            const paths = polygon?.getPath().getArray().map(getLatLngLiteral)
            props.onDragEnd?.(e, paths)
          }),
        )
      }

      return () => {
        listeners.forEach((listener) => {
          maps.event.removeListener(listener)
        })
      }
    }
  }, [polygonOptions?.clickable, polygonOptions?.draggable, polygonOptions?.editable, polygon])

  return null
}
