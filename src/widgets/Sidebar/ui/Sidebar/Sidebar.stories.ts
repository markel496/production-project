import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

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

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const NoAuth: Story = {
  decorators: [StoreDecorator({ user: {} })]
}
