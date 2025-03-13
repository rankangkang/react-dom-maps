import React, { useCallback, useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Marker } from '../components/Marker/Marker'
import { LatLng } from '../types'
import { Control } from '../components/Control'
import { createMarker } from '../components/Marker'

import { ExampleGoogleMap } from './common'
import { PinIcon } from './components/Pin'

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
  // argTypes: {
  //   lat: {
  //     description: 'latitude',
  //   },
  //   lng: {
  //     description: 'longitude',
  //   },
  //   zIndex: {
  //     description: 'z-index',
  //     // type: 'number',
  //     table: {
  //       defaultValue: {
  //         summary: '0',
  //       },
  //     },
  //   },
  //   origin: {
  //     description: 'marker 原点',
  //   },
  //   originOffset: {
  //     description: 'marker 原点偏移',
  //   },
  //   draggable: {
  //     description: 'marker 是否可拖拽，值为 true 时回调生效',
  //   },
  //   onDrag: {
  //     description: 'onDrag 回调',
  //   },
  //   onDragStart: {
  //     description: 'dragstart 回调',
  //   },
  //   onDragEnd: {
  //     description: 'dragend 回调',
  //   },
  // },
}

export default meta

type Story = StoryObj<typeof Marker>

export const CreateCustomMarker: Story = {
  args: {
    children: <div className="w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]"></div>,
    origin: 'center',
  },
  render(args) {
    // create custom marker through `createMarker` HOC
    const Pin = useMemo(() => createMarker(PinIcon), [])
    return (
      <ExampleGoogleMap>
        <Marker {...args} />
        <Pin lat={22.3} lng={114.17} origin="bottomCenter" originOffset={[0, 6]} />
      </ExampleGoogleMap>
    )
  },
}

const Pin = createMarker(PinIcon)

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

// 一些列香港经纬度
const latLngAroundHK = [
  { lat: 22.3193, lng: 114.1694 },
  { lat: 22.3027, lng: 114.1772 },
  { lat: 22.2855, lng: 114.1577 },
  { lat: 22.3364, lng: 114.1747 },
  { lat: 22.2783, lng: 114.1747 },
  { lat: 22.3072, lng: 114.2551 },
  { lat: 22.3964, lng: 114.1095 },
  { lat: 22.3193, lng: 114.2115 },
  { lat: 22.3701, lng: 114.1142 },
]

export const MultipleMarkers: Story = {
  render() {
    return (
      <ExampleGoogleMap>
        {latLngAroundHK.map((latLng, idx) => (
          <Pin {...latLng} key={idx} origin="bottomCenter" originOffset={[0, 6]} />
        ))}
      </ExampleGoogleMap>
    )
  },
}

// TODO: marker cluster
// 需要给 google map 增加 onBoundsChange 事件
// https://github.com/mapbox/supercluster
// https://github.com/leighhalliday/use-supercluster/blob/master/src/index.tsx
