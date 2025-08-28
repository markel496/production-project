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

export const Small: Story = {
  args: {
    view: ArticleView.SMALL
  }
}

export const Big: Story = {
  args: {
    view: ArticleView.BIG
  }
}

export const WithSize: Story = {
  args: {
    view: ArticleView.BIG,
    size: 50
  }
}
