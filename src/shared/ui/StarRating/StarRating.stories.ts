import { StarRating } from './StarRating'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof StarRating> = {
  title: 'Shared/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof StarRating>

export const Primary: Story = {}

export const WithSize: Story = {
  args: {
    size: 60
  }
}
