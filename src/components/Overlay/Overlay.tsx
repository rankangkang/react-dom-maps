import { useEffect, useState } from 'react'

import { useGoogleMapContext } from '../../context'
import { LatLng } from '../../types'

export interface OverlayProps {
  image: string // 图片资源（URI 或 require 路径）
  bounds: [LatLng, LatLng]
  options?: Omit<google.maps.GroundOverlayOptions, 'map'>

  onClick?: (e: google.maps.MapMouseEvent) => void
}

export const Overlay = (props: OverlayProps) => {
  const { bounds, image, options } = props
  const { map, maps } = useGoogleMapContext()
  const [overlay, setOverlay] = useState<google.maps.GroundOverlay | null>(null)

  useEffect(() => {
    const boundsObj = new maps.LatLngBounds(...bounds)
    const overlay = new maps.GroundOverlay(image, boundsObj, { clickable: options?.clickable, map })
    setOverlay(overlay)
    return () => {
      overlay.setMap(null)
    }
  }, [map, image, bounds, options?.clickable])

  useEffect(() => {
    if (!overlay) {
      return
    }

    overlay.setOpacity(options?.opacity ?? 1)
  }, [overlay, options])

  useEffect(() => {
    if (!overlay) {
      return
    }

    const listeners: google.maps.MapsEventListener[] = []
    if (props.onClick) {
      listeners.push(
        overlay.addListener('click', (e: google.maps.MapMouseEvent) => {
          props.onClick?.(e)
        }),
      )
    }

    return () => {
      listeners.forEach((listener) => listener.remove())
    }
  }, [overlay])

  return null
}
