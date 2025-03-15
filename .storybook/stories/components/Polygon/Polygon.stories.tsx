import React, { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Polygon } from '../../../../src/components/Polygon/Polygon'
import { LatLng } from '../../../../src/types'
import { Control } from '../../../../src/components/Control'

import { ExampleContainer } from '../../ExampleContainer'

const polygonLatLngs = [
  { lat: 22.3, lng: 114.1 },
  { lat: 22.3, lng: 114.2 },
  { lat: 22.4, lng: 114.2 },
  { lat: 22.4, lng: 114.1 },
]

const meta: Meta<typeof Polygon> = {
  title: 'Components/Polygon',
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
  },
  decorators: (Story) => {
    return (
      <ExampleContainer>
        <Story />
      </ExampleContainer>
    )
  },
}

export default meta

type Story = StoryObj<typeof Polygon>

export const SimplePolygon: Story = {
  render(args) {
    return (
      <ExampleContainer>
        <Polygon {...args} />
      </ExampleContainer>
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
      <>
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
      </>
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
      <>
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
      </>
    )
  },
}
