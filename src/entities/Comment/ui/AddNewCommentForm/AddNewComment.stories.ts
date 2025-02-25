import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import AddNewCommentForm from './AddNewCommentForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AddNewCommentForm> = {
  title: 'Entities/Comment/AddNewCommentForm',
  component: AddNewCommentForm,
  decorators: [ThemeDecorator(Theme.DARK)],
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
