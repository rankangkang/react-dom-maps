import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SuperCluster from 'supercluster'
import { isEqual } from 'lodash'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { Marker } from '../components/Marker/Marker'
import { LatLng } from '../types'
import { Control } from '../components/Control'
import { createMarker } from '../components/Marker'
import { useGoogleMap } from '../useGoogleMap'
import { GoogleMap } from '../GoogleMap'

import { PinIcon } from './components/Pin'
import { defaultOptions, ExampleGoogleMap } from './common'

const meta: Meta<typeof Marker> = {
  component: Marker,
  args: {
    lat: 22.3193,
    lng: 114.1694,
    zIndex: 0,
    children: <PinIcon />,
    origin: 'bottomCenter',
    originOffset: [0, 6],
    draggable: false,
    onDrag: () => {},
    onDragStart: () => {},
    onDragEnd: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Marker>

export const WrappedWithMarker: Story = {
  args: {
    origin: 'center',
  },
  render(args) {
    return (
      <ExampleGoogleMap>
        <Marker {...args}>
          <div className="w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]"></div>
        </Marker>
      </ExampleGoogleMap>
    )
  },
}

export const CreateMarkerHOC: Story = {
  render() {
    const Pin = useMemo(() => createMarker(PinIcon), [])
    return (
      <ExampleGoogleMap>
        <Pin lat={22.3} lng={114.17} origin="bottomCenter" originOffset={[0, 6]} />
      </ExampleGoogleMap>
    )
  },
}

export const DraggableMarker: Story = {
  args: {
    draggable: true,
  },
  render(args) {
    const [latlng, setLatLng] = useState<LatLng>({
      lat: 22.3193,
      lng: 114.1694,
    })

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const onDragStart = useCallback(() => {
      setIsDragging(true)
    }, [])
    const onDrag = useCallback((e: any, data: { latlng: LatLng }) => {
      setIsDragging(true)
      setLatLng(data.latlng)
    }, [])
    const onDragEnd = useCallback((e: any, data: { latlng: LatLng }) => {
      setIsDragging(false)
      setLatLng(data.latlng)
    }, [])

    return (
      <ExampleGoogleMap>
        <Control position={() => google.maps.ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">
              current latlng: {`(${latlng.lat}, ${latlng.lng})`}
            </p>
          </div>
        </Control>
        <Marker {...args} onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd} />
      </ExampleGoogleMap>
    )
  },
}

const RedDot = createMarker((props: { isCluster?: boolean; pointCount?: number; zoom: number }) => {
  if (props.isCluster) {
    const baseSize = 18
    const extraSize = Math.floor(Math.log10(props.pointCount ?? 0))
    const finalSize = baseSize + extraSize * Math.log2(props.zoom)
    return (
      <div
        style={{ width: finalSize, height: finalSize }}
        className="relative rounded-[50%] bg-radial from-[#d09b9b] to-[#f80202] flex justify-center items-center shadow-[0px_0px_6px_#d09b9b]"
      >
        {props.pointCount}
      </div>
    )
  }
  return <div className="w-[10px] h-[10px] rounded-[50%] bg-[#c82a2a]"></div>
})

// https://github.com/mapbox/supercluster
// https://github.com/leighhalliday/use-supercluster/blob/master/src/index.tsx
export const MarkerCluster: Story = {
  args: {},
  render() {
    const { api, ref } = useGoogleMap(defaultOptions)

    const [mapState, setMapState] = useState<{ zoom: number; bounds: number[] }>({
      zoom: 0,
      bounds: [],
    })
    const lastMapBounds = useRef<number[]>([])

    useEffect(() => {
      if (!api?.map) {
        return
      }

      const listener = api.map.addListener('idle', () => {
        // 检测 bounds 是否移动
        try {
          if (!api?.map) {
            return
          }

          const map = api.map
          const bounds = map.getBounds()
          if (!bounds) {
            return
          }

          const ne = bounds?.getNorthEast()
          const sw = bounds?.getSouthWest()
          if (!ne || !sw) {
            return
          }

          const edgeBounds = [sw.lng(), sw.lat(), ne.lng(), ne.lat()]
          if (!isEqual(edgeBounds, lastMapBounds.current)) {
            const zoom = map.getZoom() ?? 12
            setMapState({ zoom, bounds: edgeBounds })
            lastMapBounds.current = edgeBounds
          }
        } catch (e) {
          console.error(e)
        }
      })

      return () => {
        listener.remove()
      }
    }, [api?.map])

    const [clusters, setClusters] = useState<
      Array<SuperCluster.PointFeature<SuperCluster.AnyProps>>
    >([])

    const coordinates = useMemo(() => {
      const center = { lat: 22.3193, lng: 114.1694 }
      const radius = 5
      const points = 10000 // number of points to generate

      const randomCoordinates = Array.from({ length: points }, () => {
        const randomLat = Number((center.lat + (Math.random() - 0.5) * radius).toFixed(6))
        const randomLng = Number((center.lng + (Math.random() - 0.5) * radius).toFixed(6))
        return { lat: randomLat, lng: randomLng }
      })

      return randomCoordinates
    }, [])

    const clusterRef = useRef<SuperCluster>()
    useDeepCompareEffect(() => {
      if (!mapState) {
        return
      }

      if (!clusterRef.current) {
        const instance = new SuperCluster()
        instance.load(
          coordinates.map((item) => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [item.lng, item.lat],
              },
              properties: {},
            }
          }),
        )
        clusterRef.current = instance
      }

      setClusters(clusterRef.current.getClusters(mapState.bounds as any, mapState.zoom))
    }, [mapState])

    const coords2Show = useMemo(() => {
      return clusters.map((item) => {
        const [lng, lat] = item.geometry.coordinates
        return {
          key: item.id,
          lat,
          lng,
          isCluster: item.properties.cluster as boolean,
          pointCount: item.properties.point_count as number,
        }
      })
    }, [clusters])

    return (
      <div className="w-full h-[600px]">
        <GoogleMap className="w-full h-full relative" api={api} containerRef={ref}>
          {api && (
            <>
              {coords2Show.map((item) => (
                <RedDot {...item} zoom={mapState?.zoom ?? 12} />
              ))}
            </>
          )}
        </GoogleMap>
      </div>
    )
  },
}
