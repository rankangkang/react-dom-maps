import React, { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Control, ControlPosition, Polyline } from '../../../src'
import { LatLng } from '../../../src/types'
import { ExampleContainer } from '../GoogleMap/ExampleContainer'
import { getLatLngLiteral } from '../../../src/utils/helper'

const polylineLatLngs = [
  { lat: 22.3193, lng: 114.2115 },
  { lat: 22.3193, lng: 114.1694 },
  { lat: 22.2855, lng: 114.1577 },
  { lat: 22.3964, lng: 114.1095 },
  { lat: 22.3701, lng: 114.1142 },
]

const meta: Meta<typeof Polyline> = {
  title: 'Components/Polyline',
  component: Polyline,
  args: {
    path: polylineLatLngs,
    clickable: true,
    editable: false,
    draggable: false,
    visible: true,
    zIndex: 0,

    strokeColor: '#000',
    strokeOpacity: 0.8,
    strokeWeight: 5,
  },
  argTypes: {},
  decorators: (Story) => {
    return (
      <ExampleContainer>
        <Story />
      </ExampleContainer>
    )
  },
}

export default meta

type Story = StoryObj<typeof Polyline>

export const SimplePolyline: Story = {
  render(args) {
    return <Polyline {...args} />
  },
}

export const DraggablePolyline: Story = {
  args: {
    strokeWeight: 8,
    draggable: true,
    // editable: true,
  },
  render(args) {
    const [path, setPath] = useState<LatLng[]>(args.path || [])
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const onDragStart = useCallback(() => {
      setIsDragging(true)
    }, [])

    const onDragEnd = useCallback(
      (_: google.maps.MapMouseEvent, instance: google.maps.Polyline) => {
        setIsDragging(false)
        setPath(instance.getPath().getArray())
      },
      [],
    )

    return (
      <>
        <Control position={ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">current path: </p>
            {path.map((item) => {
              const { lat, lng } = getLatLngLiteral(item)
              return <p>{`(${lat}, ${lng})`}</p>
            })}
          </div>
        </Control>

        <Polyline {...args} path={path} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </>
    )
  },
}
