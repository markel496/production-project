import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ArticleView } from '@/entities/Article'

import { ViewSelector } from './ViewSelector'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ViewSelector> = {
  title: 'Features/ViewSelector',
  component: ViewSelector,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ViewSelector>

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
