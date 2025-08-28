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
