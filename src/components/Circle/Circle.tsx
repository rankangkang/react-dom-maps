import React, { useEffect, useMemo, useRef, useState } from 'react'

import { LatLng, MapsEvent, MapsEventHandler } from '../../types'
import { useGoogleMapContext } from '../../context'
import { attachEvents, detachEvents, getLatLngLiteral } from '../../utils/helper'

export type MapCircleEventHandler = MapsEventHandler<[google.maps.Circle]>

export interface CircleProps extends Omit<google.maps.CircleOptions, 'map'> {
  center?: LatLng | null
  radius?: number
  visible?: boolean
  draggable?: boolean
  editable?: boolean
  clickable?: boolean

  onClick?: MapCircleEventHandler
  onDblClick?: MapCircleEventHandler
  onRightClick?: MapCircleEventHandler
  onChange?: MapCircleEventHandler
  onDragStart?: MapCircleEventHandler
  onDrag?: MapCircleEventHandler
  onDragEnd?: MapCircleEventHandler

  onMouseDown?: MapCircleEventHandler
  onMouseMove?: MapCircleEventHandler
  onMouseOut?: MapCircleEventHandler
  onMouseOver?: MapCircleEventHandler
  onMouseUp?: MapCircleEventHandler
}

export const Circle = (props: CircleProps) => {
  const {
    center = null,
    radius = 0,
    clickable = true,
    draggable = false,
    editable = false,
    fillColor,
    fillOpacity,
    strokeColor,
    strokeOpacity,
    strokePosition,
    strokeWeight,
    visible = true,
    zIndex,

    onChange,
    onClick,
    onDblClick,
    onRightClick,

    onDragStart,
    onDrag,
    onDragEnd,

    onMouseDown,
    onMouseUp,
    onMouseOver,
    onMouseMove,
    onMouseOut,
  } = props
  const { map, maps } = useGoogleMapContext()
  const instance = useMemo(() => new maps.Circle(), [maps])

  useEffect(() => {
    instance.setMap(map)
    return () => instance.setMap(null)
  }, [instance, map])

  // circle meta
  useEffect(() => instance.setVisible(visible), [instance, visible])
  useEffect(() => instance.setCenter(center), [instance, center])
  useEffect(() => instance.setRadius(radius), [instance, radius])
  useEffect(() => instance.setDraggable(draggable), [instance, draggable])
  useEffect(() => instance.setEditable(editable), [instance, editable])

  // options
  useEffect(() => {
    instance.setOptions({
      clickable,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokePosition,
      strokeWeight,
      zIndex,
    })
  }, [
    instance,
    clickable,
    fillColor,
    fillOpacity,
    strokeColor,
    strokeOpacity,
    strokePosition,
    strokeWeight,
    zIndex,
  ])

  // event
  // click events
  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.Click]: getCircleEventHandler(instance, onClick),
      [MapsEvent.DblClick]: getCircleEventHandler(instance, onDblClick),
      [MapsEvent.RightClick]: getCircleEventHandler(instance, onRightClick),
      [MapsEvent.MouseUp]: getCircleEventHandler(instance, onMouseUp),
      [MapsEvent.MouseDown]: getCircleEventHandler(instance, onMouseDown),
      [MapsEvent.MouseOver]: getCircleEventHandler(instance, onMouseOver),
      [MapsEvent.MouseOut]: getCircleEventHandler(instance, onMouseOut),
      [MapsEvent.MouseMove]: getCircleEventHandler(instance, onMouseMove),
    })
    return () => detachEvents(listeners)
  }, [instance, onClick, onRightClick, onDblClick, onMouseUp, onMouseDown, onMouseOver, onMouseOut])

  // drag events
  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.DragStart]: getCircleEventHandler(instance, onDragStart),
      [MapsEvent.Drag]: getCircleEventHandler(instance, onDrag),
      [MapsEvent.DragEnd]: getCircleEventHandler(instance, onDragEnd),
    })
    return () => detachEvents(listeners)
  }, [instance, onDragStart, onDragEnd, onDrag])

  // circle change
  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.CenterChanged]: getCircleEventHandler(instance, onChange),
      [MapsEvent.RadiusChanged]: getCircleEventHandler(instance, onChange),
    })
    return () => detachEvents(listeners)
  }, [instance, onChange])

  return null
}

function getCircleEventHandler(instance: google.maps.Circle, handler?: MapCircleEventHandler) {
  if (!handler) {
    return undefined
  }

  return (e: google.maps.MapMouseEvent) => handler(e, instance)
}
