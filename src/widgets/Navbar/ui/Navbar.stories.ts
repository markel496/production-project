import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { Navbar } from './Navbar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Navbar> = {
  title: 'Widgets/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Primary: Story = {}

export const AuthNavbar: Story = {
  decorators: [StoreDecorator({ user: { authData: {} } })]
}
