import type { Meta, StoryObj } from '@storybook/react'
import AddNewCommentForm from './AddNewCommentForm'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof AddNewCommentForm> = {
  title: 'Entities/Comment/AddNewCommentForm',
  component: AddNewCommentForm,
  decorators: [ThemeDecorator(Theme.DARK)],
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof AddNewCommentForm>

export const Light: Story = {
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const Dark: Story = {}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}
