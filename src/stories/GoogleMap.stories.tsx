import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { GoogleMap } from '../GoogleMap'

import { ExampleGoogleMap } from './common'

const meta: Meta<typeof GoogleMap> = {
  component: GoogleMap,
}

export default meta
type Story = StoryObj<typeof GoogleMap>

export const WithUseGoogleMap: Story = {
  render() {
    return <ExampleGoogleMap />
  },
}
