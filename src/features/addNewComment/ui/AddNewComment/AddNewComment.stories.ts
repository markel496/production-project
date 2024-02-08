import type { Meta, StoryObj } from '@storybook/react'
import AddNewComment from './AddNewComment'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

const meta: Meta<typeof AddNewComment> = {
  title: 'Features/AddNewComment',
  component: AddNewComment,
  decorators: [ThemeDecorator(Theme.DARK)],
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof AddNewComment>

export const Light: Story = {
  args: {},
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)]
}

export const Dark: Story = {
  args: {},
  decorators: [StoreDecorator({})]
}
