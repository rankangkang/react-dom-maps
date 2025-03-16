import React, { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Circle } from '../../../../src/components/Circle'

import { ExampleContainer } from '../../ExampleContainer'
import { Control, ControlPosition } from '../../../../src/components/Control'
import { LatLng } from '../../../../src/types'
import { getLatLngLiteral } from '../../../../src/utils/helper'

const meta: Meta<typeof Circle> = {
  title: 'Components/Circle',
  component: Circle,
  args: {
    center: { lat: 22.3, lng: 114.1 },
    radius: 10000,
    editable: false,
    draggable: false,
    clickable: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    strokePosition: 0.0,
    visible: true,
    zIndex: 0,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  },
  tags: ['autodocs'],
  decorators: (Story) => {
    return (
      <ExampleContainer>
        <Story />
      </ExampleContainer>
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SimpleCircle: Story = {
  args: {},
  render(args) {
    return <Circle {...args} />
  },
}

export const DraggableAndEditableCircle: Story = {
  args: {
    editable: true,
    draggable: true,
  },
  render(args) {
    const [data, setData] = useState<{ center: LatLng; radius: number }>({
      center: args.center!,
      radius: args.radius!,
    })
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const onDragStart = useCallback(() => {
      setIsDragging(true)
    }, [])

    const onDragEnd = useCallback((_: google.maps.MapMouseEvent, instance: google.maps.Circle) => {
      setIsDragging(false)
      setData({
        center: instance.getCenter()!,
        radius: instance.getRadius(),
      })
    }, [])

    const onChange = useCallback((_: google.maps.MapMouseEvent, instance: google.maps.Circle) => {
      setData({
        center: instance.getCenter()!,
        radius: instance.getRadius(),
      })
    }, [])

    const { lat, lng } = getLatLngLiteral(data.center)
    const radius = data.radius
    return (
      <>
        <Control position={ControlPosition.TOP_LEFT} id="top-left-panel">
          <div className="ml-[24px]">
            <p className="text-[#fff] text-[20px]">
              status: {isDragging ? 'dragging' : 'not dragging'}
            </p>
            <p className="text-[#fff] text-[20px]">center: {`(${lat}, ${lng})`}</p>
            <p className="text-[#fff] text-[20px]">radius: {radius}</p>
          </div>
        </Control>
        <Circle
          {...args}
          {...data}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onChange={onChange}
        />
      </>
    )
  },
}
