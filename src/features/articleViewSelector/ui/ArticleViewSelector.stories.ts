import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ArticleView } from '@/entities/Article'

import { ArticleViewSelector } from './ArticleViewSelector'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleViewSelector> = {
  title: 'Features/ArticleViewSelector',
  component: ArticleViewSelector,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleViewSelector>

export const Primary: Story = {
  args: {
    view: ArticleView.SMALL
  }
}

export const Dark: Story = {
  args: {
    view: ArticleView.BIG
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {
    view: ArticleView.SMALL
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
