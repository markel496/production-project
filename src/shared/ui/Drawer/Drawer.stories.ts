import { Drawer } from './Drawer'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Drawer> = {
  title: 'Shared/Drawer',
  component: Drawer,

  args: {
    isOpen: true,
    children: 'Test'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Primary: Story = {}
