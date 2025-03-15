import React, { useEffect, useMemo } from 'react'

import { useGoogleMapContext } from '../../context'
import { LatLng, MapsEvent, MapsEventHandler } from '../../types'
import { attachEvents, detachEvents, getMapsEventHandler } from '../../utils/helper'

export type MapPolygonEventHandler = MapsEventHandler<[google.maps.Polygon]>

export interface PolygonProps extends Omit<google.maps.PolygonOptions, 'map'> {
  paths?: LatLng[]
  visible?: boolean
  editable?: boolean
  draggable?: boolean
  clickable?: boolean

  onClick?: MapPolygonEventHandler
  onRightClick?: MapPolygonEventHandler
  onDblClick?: MapPolygonEventHandler
  // onChange?: MapPolygonEventHandler
  onDragStart?: MapPolygonEventHandler
  onDrag?: MapPolygonEventHandler
  onDragEnd?: MapPolygonEventHandler
  onMouseOut?: MapPolygonEventHandler
  onMouseOver?: MapPolygonEventHandler
  onMouseUp?: MapPolygonEventHandler
  onMouseDown?: MapPolygonEventHandler
  onMouseMove?: MapPolygonEventHandler
}

export const Polygon = (props: PolygonProps) => {
  const {
    paths,
    clickable = true,
    draggable = false,
    editable = false,
    fillColor,
    fillOpacity,
    geodesic,
    strokeColor,
    strokeOpacity,
    strokePosition,
    strokeWeight,
    visible = true,
    zIndex,

    // onChange,
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
  const instance = useMemo(() => new maps.Polygon(), [maps])

  // map
  useEffect(() => {
    instance.setMap(map)
    return () => instance.setMap(null)
  }, [instance, map])

  // polyline meta
  useEffect(() => instance.setPath(paths ?? []), [instance, paths])
  useEffect(() => instance.setVisible(visible), [instance, visible])
  useEffect(() => instance.setDraggable(draggable), [instance, draggable])
  useEffect(() => instance.setEditable(editable), [instance, editable])

  // polyline options
  useEffect(() => {
    instance.setOptions({
      clickable,
      geodesic,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      strokePosition,
      zIndex,
    })
  }, [
    instance,
    clickable,
    clickable,
    geodesic,
    fillColor,
    fillOpacity,
    strokeColor,
    strokeOpacity,
    strokeWeight,
    strokePosition,
    zIndex,
  ])

  // event
  // click events
  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.Click]: getMapsEventHandler(instance, onClick),
      [MapsEvent.DblClick]: getMapsEventHandler(instance, onDblClick),
      [MapsEvent.RightClick]: getMapsEventHandler(instance, onRightClick),
      [MapsEvent.MouseUp]: getMapsEventHandler(instance, onMouseUp),
      [MapsEvent.MouseDown]: getMapsEventHandler(instance, onMouseDown),
      [MapsEvent.MouseOver]: getMapsEventHandler(instance, onMouseOver),
      [MapsEvent.MouseOut]: getMapsEventHandler(instance, onMouseOut),
      [MapsEvent.MouseMove]: getMapsEventHandler(instance, onMouseMove),
    })
    return () => detachEvents(listeners)
  }, [instance, onClick, onRightClick, onDblClick, onMouseUp, onMouseDown, onMouseOver, onMouseOut])

  // drag events
  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.DragStart]: getMapsEventHandler(instance, onDragStart),
      [MapsEvent.Drag]: getMapsEventHandler(instance, onDrag),
      [MapsEvent.DragEnd]: getMapsEventHandler(instance, onDragEnd),
    })
    return () => detachEvents(listeners)
  }, [instance, onDragStart, onDragEnd, onDrag])

  // path change
  // FIXME: path_changed event is not working
  // useEffect(() => {
  //   const listeners = attachEvents(instance, {
  //     [MapsEvent.PathChanged]: getMapsEventHandler(instance, onChange),
  //     [MapsEvent.PathsChanged]: getMapsEventHandler(instance, onChange),
  //   })
  //   return () => detachEvents(listeners)
  // }, [paths, onChange])

  return null
}
