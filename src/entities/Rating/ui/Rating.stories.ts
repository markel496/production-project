import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Rating } from './Rating'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Rating> = {
  title: 'Entities/Rating',
  component: Rating,
  parameters: {
    layout: 'padded'
  },
  args: {
    title: 'Как вам статья?'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Rating>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}

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
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const AlreadyRated: Story = {
  args: {
    title: 'Спасибо за оценку!',
    rating: 4
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
