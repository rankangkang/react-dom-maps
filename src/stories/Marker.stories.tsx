import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Marker } from '../components/Marker/Marker'

import { ExampleGoogleMap } from './common'

const meta: Meta<typeof Marker> = {
  component: Marker,
}

export default meta

type Story = StoryObj<typeof Marker>

export const MarkerComponent: Story = {
  args: {
    lat: 22.3193,
    lng: 114.1694,
    children: <div className="w-[20px] h-[20px] rounded-[50%] bg-[#ee0000]"></div>,
  },
  render(args) {
    return (
      <ExampleGoogleMap>
        <Marker {...args}></Marker>
      </ExampleGoogleMap>
    )
  },
}
