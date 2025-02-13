import type { Meta, StoryObj } from '@storybook/react'
import { StarRating } from './StarRating'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

const meta: Meta<typeof StarRating> = {
  title: 'Shared/StarRating',
  component: StarRating,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof StarRating>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const WithSize: Story = {
  args: {
    size: 60
  }
}
