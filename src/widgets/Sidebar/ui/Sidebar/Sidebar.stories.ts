import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { Sidebar } from './Sidebar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/SideBar',
  component: Sidebar,

  decorators: [StoreDecorator({ user: { authData: {} } })],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Primary: Story = {}

export const NoAuth: Story = {
  decorators: [StoreDecorator({ user: {} })]
}
