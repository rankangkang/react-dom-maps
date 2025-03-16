import { Overlay } from '../../../src'

import type { Meta, StoryObj } from '@storybook/react'
import { ExampleContainer } from '../GoogleMap/ExampleContainer'
import React from 'react'

// Overlay 组件的 Meta 配置
const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
  args: {
    image: 'https://picsum.photos/seed/picsum/200/300',
    bounds: [
      { lat: 22.3, lng: 114.1 },
      { lat: 22.4, lng: 114.2 },
    ],
    opacity: 1,
    clickable: true,
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

type Story = StoryObj<typeof Overlay>

// 自定义背景色示例
export const SimpleOverlay: Story = {
  args: {},
  render: (args) => {
    return <Overlay {...args} />
  },
}
