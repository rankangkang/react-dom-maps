import React, { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Polygon } from '../../../src/components/Polygon/Polygon'
import { LatLng } from '../../../src/types'
import { Control, ControlPosition } from '../../../src/components/Control'
import { ExampleContainer } from '../GoogleMap/ExampleContainer'
import { getLatLngLiteral } from '../../../src/utils/helper'

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
    editable: false,
    draggable: false,
    clickable: true,
    strokeColor: '#000',
    strokeOpacity: 0.5,
    fillColor: '#000',
    fillOpacity: 0.5,
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
    draggable: true,
  },
  render(args) {
    const [paths, setPaths] = useState<LatLng[]>(args.paths || [])
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const onDragStart = useCallback(() => {
      setIsDragging(true)
    }, [])

    const onDragEnd = useCallback((_: google.maps.MapMouseEvent, instance: google.maps.Polygon) => {
      setIsDragging(false)
      setPaths(instance.getPath().getArray())
    }, [])

    return (
      <>
        <Control position={ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">current path:</p>
            {paths.map((item) => {
              const { lat, lng } = getLatLngLiteral(item)
              return <p>{`(${lat}, ${lng})`}</p>
            })}
          </div>
        </Control>
        <Polygon {...args} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </>
    )
  },
}
