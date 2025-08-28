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
