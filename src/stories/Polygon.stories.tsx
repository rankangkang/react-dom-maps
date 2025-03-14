import React, { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Polygon } from '../components/Polygon'
import { LatLng } from '../types'
import { Control } from '../components/Control'

import { ExampleGoogleMap } from './common'

const polygonLatLngs = [
  { lat: 22.3, lng: 114.1 },
  { lat: 22.3, lng: 114.2 },
  { lat: 22.4, lng: 114.2 },
  { lat: 22.4, lng: 114.1 },
]

const meta: Meta<typeof Polygon> = {
  component: Polygon,
  args: {
    paths: polygonLatLngs,
    options: {
      editable: false,
      draggable: false,
      clickable: false,
      strokeColor: '#000',
      strokeOpacity: 0.5,
      fillColor: '#000',
      fillOpacity: 0.5,
    },
    onChange: () => {},
    onClick: () => {},
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {},
  },
}

export default meta

type Story = StoryObj<typeof Polygon>

export const SimplePolygon: Story = {
  render(args) {
    return (
      <ExampleGoogleMap>
        <Polygon {...args} />
      </ExampleGoogleMap>
    )
  },
}

export const DraggablePolygon: Story = {
  args: {
    options: {
      draggable: true,
    },
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.paths || [])
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
        <Polygon {...args} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </ExampleGoogleMap>
    )
  },
}

export const EditablePolygon: Story = {
  args: {
    options: {
      editable: true,
    },
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.paths || [])
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
        <Polygon {...args} onChange={onChange} />
      </ExampleGoogleMap>
    )
  },
}
