import React, { useEffect, useMemo } from 'react'

import { LatLng, MapsEvent, MapsEventHandler } from '../../types'
import { useMapCtx } from '../../context'
import { attachEvents, detachEvents, getMapsEventHandler } from '../../utils/helper'

export type MapCircleEventHandler = MapsEventHandler<[google.maps.Circle]>

export interface CircleProps extends Omit<google.maps.CircleOptions, 'map'> {
  _instance?: google.maps.Circle
  center?: LatLng | null
  radius?: number
  visible?: boolean
  draggable?: boolean
  editable?: boolean
  clickable?: boolean

  onClick?: MapCircleEventHandler
  onDblClick?: MapCircleEventHandler
  onContextMenu?: MapCircleEventHandler
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
    _instance,
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
    onContextMenu,

    onDragStart,
    onDrag,
    onDragEnd,

    onMouseDown,
    onMouseUp,
    onMouseOver,
    onMouseMove,
    onMouseOut,
  } = props
  const { map, maps } = useMapCtx()
  const instance = useMemo(() => _instance || new maps.Circle(), [maps, _instance])

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
      [MapsEvent.Click]: getMapsEventHandler(instance, onClick),
      [MapsEvent.DblClick]: getMapsEventHandler(instance, onDblClick),
      [MapsEvent.ContextMenu]: getMapsEventHandler(instance, onContextMenu),
      [MapsEvent.MouseUp]: getMapsEventHandler(instance, onMouseUp),
      [MapsEvent.MouseDown]: getMapsEventHandler(instance, onMouseDown),
      [MapsEvent.MouseOver]: getMapsEventHandler(instance, onMouseOver),
      [MapsEvent.MouseOut]: getMapsEventHandler(instance, onMouseOut),
      [MapsEvent.MouseMove]: getMapsEventHandler(instance, onMouseMove),
    })
    return () => detachEvents(listeners)
  }, [
    instance,
    onClick,
    onContextMenu,
    onDblClick,
    onMouseUp,
    onMouseDown,
    onMouseOver,
    onMouseOut,
  ])

  // drag events
  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.DragStart]: getMapsEventHandler(instance, onDragStart),
      [MapsEvent.Drag]: getMapsEventHandler(instance, onDrag),
      [MapsEvent.DragEnd]: getMapsEventHandler(instance, onDragEnd),
    })
    return () => detachEvents(listeners)
  }, [instance, onDragStart, onDragEnd, onDrag])

  // circle change
  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.CenterChanged]: getMapsEventHandler(instance, onChange),
      [MapsEvent.RadiusChanged]: getMapsEventHandler(instance, onChange),
    })
    return () => detachEvents(listeners)
  }, [instance, onChange])

  return null
}
