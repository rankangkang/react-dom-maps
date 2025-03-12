import React, { memo, useEffect, useRef } from 'react'

import { useGoogleMapContext } from '../../context'
import { LatLng } from '../../types'
import { getLatLngLiteral } from '../../utils/helper'

export interface PolygonProps {
  paths?: LatLng[]
  options?: Omit<google.maps.PolygonOptions, 'map'>
  onClick?: (e: google.maps.MapMouseEvent) => void
  onEditEnd?: (nextPaths?: LatLng[]) => void

  onDragStart?: (e: google.maps.MapMouseEvent) => void
  onDrag?: (e: google.maps.MapMouseEvent) => void
  onDragEnd?: (e: google.maps.MapMouseEvent, paths?: LatLng[]) => void
}

export const Polygon = (props: PolygonProps) => {
  const {
    onClick,
    onEditEnd,
    onDragStart,
    onDrag,
    onDragEnd,
    paths,
    options: polygonOptions,
  } = props
  const { map, maps } = useGoogleMapContext()

  const polygonRef = useRef<google.maps.Polygon | null>(null)

  useEffect(() => {
    polygonRef.current = new maps.Polygon({
      map,
      paths,
      ...polygonOptions,
    })

    const listeners: google.maps.MapsEventListener[] = []

    if (polygonOptions?.clickable && onClick) {
      const clickListener = polygonRef.current.addListener(
        'click',
        (e: google.maps.MapMouseEvent) => {
          onClick?.(e)
        },
      )
      listeners.push(clickListener)
    }

    if (polygonOptions?.editable && onEditEnd) {
      const handler = () => {
        const nextPaths = polygonRef.current
          ?.getPath()
          .getArray()
          .map((latLng) => ({
            latitude: latLng.lat(),
            longitude: latLng.lng(),
          }))
          .map(getLatLngLiteral)

        onEditEnd(nextPaths)
      }

      listeners.push(
        // polygonRef.current.getPath().addListener("set_at", handler),
        polygonRef.current.getPath().addListener('insert_at', handler),
        polygonRef.current.getPath().addListener('remove_at', handler),
      )
    }

    if (polygonOptions?.draggable) {
      if (onDragStart) {
        listeners.push(
          polygonRef.current.addListener('dragstart', (e: google.maps.MapMouseEvent) => {
            onDragStart(e)
          }),
        )
      }

      if (onDrag) {
        listeners.push(
          polygonRef.current.addListener('drag', (e: google.maps.MapMouseEvent) => {
            onDrag(e)
          }),
        )
      }

      if (onDragEnd) {
        listeners.push(
          polygonRef.current.addListener('dragend', (e: google.maps.MapMouseEvent) => {
            // 获取更新后的全部路径坐标
            const paths = polygonRef.current?.getPath().getArray().map(getLatLngLiteral)
            onDragEnd(e, paths)
          }),
        )
      }
    }

    return () => {
      listeners.forEach((listener) => {
        maps.event.removeListener(listener)
      })
      polygonRef.current?.setMap(null)
    }
  }, [map, paths, polygonOptions])

  return null
}
