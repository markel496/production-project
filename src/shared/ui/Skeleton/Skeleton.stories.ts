import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded'
  },
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

export const PrimaryDark: Story = {
  args: {
    width: '100%',
    height: 200
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const CircleDark: Story = {
  args: {
    width: 100,
    height: 100,
    border: '50%'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const PrimaryGreen: Story = {
  args: {
    width: '100%',
    height: 200
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const CircleGreen: Story = {
  args: {
    width: 100,
    height: 100,
    border: '50%'
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
