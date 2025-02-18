import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { Navbar } from './Navbar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Navbar> = {
  title: 'Widgets/Navbar',
  component: Navbar,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Light: Story = {
  decorators: [StoreDecorator({})]
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN), StoreDecorator({})]
}

export const AuthNavbar: Story = {
  decorators: [StoreDecorator({ user: { authData: {} } })]
}

export const AuthNavbarDark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ user: { authData: {} } })
  ]
}

export const AuthNavbarGreen: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({ user: { authData: {} } })
  ]
}
