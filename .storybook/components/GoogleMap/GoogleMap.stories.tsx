import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { GoogleMap } from '../../../src/GoogleMap'

import { ExampleContainer } from './ExampleContainer'

const meta: Meta<typeof GoogleMap> = {
  title: 'Components/GoogleMap',
  component: GoogleMap,
}

export default meta
type Story = StoryObj<typeof GoogleMap>

export const WithUseGoogleMap: Story = {
  render() {
    return <ExampleContainer />
  },
}
