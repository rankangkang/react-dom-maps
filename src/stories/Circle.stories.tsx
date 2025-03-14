import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Circle } from '../components/Circle'

import { ExampleGoogleMap } from './common'

const meta: Meta<typeof Circle> = {
  component: Circle,
  args: {
    center: { lat: 22.3, lng: 114.1 },
    radius: 10000,
    options: {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    },
  },
  tags: ['autodocs'],
  decorators: (Story) => {
    return (
      <ExampleGoogleMap>
        <Story />
      </ExampleGoogleMap>
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 基础圆形示例
export const SimpleCircle: Story = {
  args: {},
  render(args) {
    return <Circle {...args} />
  },
}
