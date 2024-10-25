import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

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
  args: {},
  decorators: [StoreDecorator({})]
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})]
}

export const Green: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.GREEN), StoreDecorator({})]
}

export const AuthNavbar: Story = {
  args: {},
  decorators: [StoreDecorator({ user: { authData: {} } })]
}

export const AuthNavbarDark: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ user: { authData: {} } })
  ]
}

export const AuthNavbarGreen: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({ user: { authData: {} } })
  ]
}
