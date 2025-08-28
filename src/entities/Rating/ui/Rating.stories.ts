import { Rating } from './Rating'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Rating> = {
  title: 'Entities/Rating',
  component: Rating,

  args: {
    title: 'Как вам статья?'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Rating>

export const Primary: Story = {}

export const WithoutTitle: Story = {
  args: {
    title: undefined
  }
}

export const WithFeedback: Story = {
  args: {
    hasFeedback: true,
    feedbackTitle: 'Оставьте отзыв',
    placeholder: 'Напишите что-нибудь...'
  }
}

export const AlreadyRated: Story = {
  args: {
    title: 'Спасибо за оценку!',
    rating: 4
  }
}
