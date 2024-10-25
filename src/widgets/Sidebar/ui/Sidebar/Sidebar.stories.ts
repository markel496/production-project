import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/SideBar',
  component: Sidebar,
  parameters: {
    layout: 'padded'
  },
  decorators: [StoreDecorator({ user: { authData: {} } })],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const NoAuth: Story = {
  args: {},
  decorators: [StoreDecorator({ user: {} })]
}
