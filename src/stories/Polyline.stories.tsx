import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Polyline } from '../components/Polyline'
import { Polygon } from '../components/Polygon'
import { Control } from '../components/Control'
import { LatLng } from '../types'

import { ExampleGoogleMap } from './common'

const polylineLatLngs = [
  { lat: 22.3193, lng: 114.2115 },
  { lat: 22.3193, lng: 114.1694 },
  { lat: 22.2855, lng: 114.1577 },
  { lat: 22.3964, lng: 114.1095 },
  { lat: 22.3701, lng: 114.1142 },
]

const meta: Meta<typeof Polyline> = {
  component: Polyline,
  args: {
    path: polylineLatLngs,
    options: {
      strokeColor: '#000',
      strokeOpacity: 0.8,
      strokeWeight: 5,
      clickable: false,
      editable: false,
      draggable: false,
    },
    // onChange: () => {},
    // onClick: () => {},
    // onDragStart: () => {},
    // onDrag: () => {},
    // onDragEnd: () => {},
  },
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Polyline>

export const SimplePolyline: Story = {
  render(args) {
    return (
      <ExampleGoogleMap>
        <Polyline {...args} />
      </ExampleGoogleMap>
    )
  },
}

export const DraggablePolyline: Story = {
  args: {
    options: {
      strokeWeight: 8,
      draggable: true,
    },
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.path || [])
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const onDragStart = useCallback(() => {
      setIsDragging(true)
    }, [])

    const onDragEnd = useCallback((_: google.maps.MapMouseEvent, nextPaths?: LatLng[]) => {
      setIsDragging(false)
      if (nextPaths) {
        setPaths(nextPaths)
      }
    }, [])

    return (
      <ExampleGoogleMap>
        <Control position={() => google.maps.ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">
              current path:{' '}
              {paths.map((item) => {
                return <p>{`(${item.lat}, ${item.lng})`}</p>
              })}
            </p>
          </div>
        </Control>

        <Polyline {...args} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </ExampleGoogleMap>
    )
  },
}

export const EditablePolyline: Story = {
  args: {
    options: {
      editable: true,
    },
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.path || [])
    const onChange = useCallback((_: google.maps.MapMouseEvent, nextPaths?: LatLng[]) => {
      if (nextPaths) {
        setPaths(nextPaths)
      }
    }, [])
    return (
      <ExampleGoogleMap>
        <Control position={() => google.maps.ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              current path:{' '}
              {paths.map((item) => {
                return <p>{`(${item.lat}, ${item.lng})`}</p>
              })}
            </p>
          </div>
        </Control>
        <Polyline {...args} onChange={onChange} />
      </ExampleGoogleMap>
    )
  },
}
