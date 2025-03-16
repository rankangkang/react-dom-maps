import { Control, ControlPosition } from '../../../../src/components/Control/Control'
import type { Meta, StoryObj } from '@storybook/react'
import { ExampleContainer } from '../../ExampleContainer'
import React from 'react'

const meta = {
  title: 'Components/Control',
  component: Control,
  args: {
    position: ControlPosition.BOTTOM_CENTER,
    id: 'TEST_CONTROL',
    className: 'h-[48px] w-[48px]',
  },
  decorators: (Story) => {
    return (
      <ExampleContainer>
        <Story />
      </ExampleContainer>
    )
  },
} satisfies Meta<typeof Control>

export default meta
type Story = StoryObj<typeof Control>

export const CustomPosition: Story = {
  args: {},

  render(args) {
    return (
      <Control {...args}>
        <div className="flex justify-center items-center text-[48px] absolute left-1/2 top-1/2 -translate-1/2">
          🌍
        </div>
      </Control>
    )
  },
}
