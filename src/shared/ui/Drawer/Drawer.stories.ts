import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Drawer } from './Drawer'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Drawer> = {
  title: 'Shared/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded'
  },
  args: {
    isOpen: true,
    children: 'Test'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}
