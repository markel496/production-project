import type { Meta, StoryObj } from '@storybook/react'
import { ArticleRating } from './ArticleRating'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'

const meta: Meta<typeof ArticleRating> = {
  title: 'features/ArticleRating',
  component: ArticleRating,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleRating>

export const Primary: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}
