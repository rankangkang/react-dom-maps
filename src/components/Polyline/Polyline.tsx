import { noop } from 'lodash'
import { useEffect, useMemo } from 'react'

import { useGoogleMapContext } from '../../context'
import { attachEvents, detachEvents, getMapsEventHandler } from '../../utils/helper'
import { LatLng, MapsEvent, MapsEventHandler } from '../../types'

export type MapPolylineEventHandler = MapsEventHandler<[google.maps.Polyline]>

export interface PolylineProps extends Omit<google.maps.PolylineOptions, 'map'> {
  _instance?: google.maps.Polyline
  /** polyline path */
  path?: LatLng[]
  clickable?: boolean
  draggable?: boolean
  editable?: boolean
  geodesic?: boolean
  visible?: boolean
  zIndex?: number | null

  onMouseOut?: MapPolylineEventHandler
  onMouseOver?: MapPolylineEventHandler
  onMouseUp?: MapPolylineEventHandler
  onMouseDown?: MapPolylineEventHandler
  onMouseMove?: MapPolylineEventHandler

  onClick?: MapPolylineEventHandler
  onContextMenu?: MapPolylineEventHandler
  onDblClick?: MapPolylineEventHandler
  // onChange?: MapPolylineEventHandler

  onDragStart?: MapPolylineEventHandler
  onDrag?: MapPolylineEventHandler
  onDragEnd?: MapPolylineEventHandler
}

export const Polyline = (props: PolylineProps) => {
  const {
    _instance,
    path,
    clickable = true,
    draggable = false,
    editable = false,
    geodesic,
    icons,
    strokeColor,
    strokeOpacity,
    strokeWeight,
    visible = true,
    zIndex,

    // onChange,
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
  const { map, maps } = useGoogleMapContext()
  const instance = useMemo(() => _instance || new maps.Polyline(), [maps, _instance])

  // map
  useEffect(() => {
    instance.setMap(map)
    return () => instance.setMap(null)
  }, [map])

  // polyline meta
  useEffect(() => instance.setPath(path ?? []), [instance, path])
  useEffect(() => instance.setVisible(visible), [instance, visible])
  useEffect(() => instance.setDraggable(draggable), [instance, draggable])
  useEffect(() => instance.setEditable(editable), [instance, editable])

  // polyline options
  useEffect(() => {
    instance.setOptions({
      clickable,
      geodesic,
      icons,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      zIndex,
    })
  }, [clickable, geodesic, icons, strokeColor, strokeOpacity, strokeWeight, zIndex])

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

  return null
}
