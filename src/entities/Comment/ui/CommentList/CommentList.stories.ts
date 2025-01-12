import type { Meta, StoryObj } from '@storybook/react'
import { CommentList } from './CommentList'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { Comment } from '../../model/types/comment'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import avatar from '@/shared/assets/tests/avatar.jpg'

const meta: Meta<typeof CommentList> = {
  title: 'Entities/Comment/CommentList',
  component: CommentList,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  decorators: [StoreDecorator({ user: { authData: { _id: '1' } } })],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CommentList>

const comments: Comment[] = [
  {
    _id: '1',
    user: {
      _id: '1',
      username: 'Commentator'
    },
    text: 'Comment1',
    createdAt: '24 окт. 2024 г. в 21:30',
    updatedAt: '24 окт. 2024 г. в 21:30'
  },
  {
    _id: '2',
    user: {
      _id: '2',
      username: 'Vanya',
      avatar
    },
    text: 'Comment2',
    createdAt: '24 окт. 2024 г. в 21:30',
    updatedAt: '24 окт. 2024 г. в 21:34'
  },
  {
    _id: '3',
    user: {
      _id: '1',
      username: 'Commentator'
    },
    text: 'Comment10',
    createdAt: '24 окт. 2024 г. в 21:35',
    updatedAt: '24 окт. 2024 г. в 21:35'
  }
]

export const Primary: Story = {
  args: {
    comments
  }
}

export const Dark: Story = {
  args: {
    comments
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {
    comments
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}

export const LoadingDark: Story = {
  args: {
    isLoading: true
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const LoadingGreen: Story = {
  args: {
    isLoading: true
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const Error: Story = {
  args: {
    error: 'error'
  }
}
