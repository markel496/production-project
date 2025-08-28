import { Skeleton } from './Skeleton'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Primary: Story = {
  args: {
    width: '100%',
    height: 200
  }
}

export const Circle: Story = {
  args: {
    width: 100,
    height: 100,
    border: '50%'
  }
}
