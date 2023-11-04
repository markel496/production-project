import type { Meta, StoryObj } from '@storybook/react'
import ProfilePage from './ProfilePage'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
  decorators: [StoreDecorator({})],
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ProfilePage>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}
