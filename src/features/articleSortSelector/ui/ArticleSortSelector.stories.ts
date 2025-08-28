import { ArticleSortSelector } from './ArticleSortSelector'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleSortSelector> = {
  title: 'Features/ArticleSortSelector',
  component: ArticleSortSelector,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleSortSelector>

export const Primary: Story = {}
