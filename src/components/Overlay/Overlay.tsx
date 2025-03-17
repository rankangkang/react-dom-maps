import { useEffect, useMemo, useState } from 'react'

import { useMapCtx } from '../../context'
import { LatLng, MapsEvent, MapsEventHandler } from '../../types'
import { attachEvents, detachEvents, getMapsEventHandler } from '../../utils/helper'

export type MapOverlayEventHandler = MapsEventHandler<[google.maps.GroundOverlay]>

export interface OverlayProps extends Omit<google.maps.GroundOverlayOptions, 'map'> {
  image: string
  bounds: [LatLng, LatLng]
  opacity?: number
  clickable?: boolean

  onClick?: MapOverlayEventHandler
  onDblClick?: MapOverlayEventHandler
}

export const Overlay = (props: OverlayProps) => {
  const { bounds, image, clickable = true, opacity = 1, onClick, onDblClick } = props
  const { map, maps } = useMapCtx()
  const instance = useMemo(
    () => new maps.GroundOverlay(image, new maps.LatLngBounds(...bounds), { clickable }),
    [maps, map, image, bounds, clickable],
  )

  useEffect(() => {
    instance.setMap(map)
    return () => instance.setMap(null)
  }, [instance, map])

  useEffect(() => instance.setOpacity(opacity), [instance, opacity])

  useEffect(() => {
    const listeners = attachEvents(instance, {
      [MapsEvent.Click]: getMapsEventHandler(instance, onClick),
      [MapsEvent.DblClick]: getMapsEventHandler(instance, onDblClick),
    })
    return () => detachEvents(listeners)
  }, [instance, onClick, onDblClick])

  return null
}
