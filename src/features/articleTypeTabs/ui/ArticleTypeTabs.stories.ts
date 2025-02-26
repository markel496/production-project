import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { ArticleTypeTabs } from './ArticleTypeTabs'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleTypeTabs> = {
  title: 'Features/ArticleTypeTabs',
  component: ArticleTypeTabs,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleTypeTabs>

export const Primary: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}
