import { ArticlesPageGreeting } from './ArticlesPageGreeting'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticlesPageGreeting> = {
  title: 'features/ArticlesPageGreeting',
  component: ArticlesPageGreeting,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticlesPageGreeting>

export const Primary: Story = {}
