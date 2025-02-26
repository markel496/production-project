import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { ArticleSearch } from './ArticleSearch'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleSearch> = {
  title: 'Features/ArticleSearch',
  component: ArticleSearch,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleSearch>

export const Primary: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}
