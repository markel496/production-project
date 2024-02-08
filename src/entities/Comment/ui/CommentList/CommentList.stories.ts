import type { Meta, StoryObj } from '@storybook/react'
import { CommentList } from './CommentList'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Comment } from '../../model/types/comment'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

const meta: Meta<typeof CommentList> = {
  title: 'Entities/Comment/CommentList',
  component: CommentList,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  decorators: [StoreDecorator({ user: { authData: { id: '1' } } })],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CommentList>

const comments: Comment[] = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'Commentator'
    },
    text: 'Comment1',
    createdAt: '01.01.1996',
    edited: false
  },
  {
    id: '2',
    user: {
      id: '2',
      username: 'Vanya',
      avatar:
        'https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg'
    },
    text: 'Comment2',
    createdAt: '01.01.1996',
    edited: true
  },
  {
    id: '3',
    user: {
      id: '1',
      username: 'Commentator'
    },
    text: 'Comment10',
    createdAt: '01.01.1996',
    edited: true
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

export const Error: Story = {
  args: {
    error: 'error'
  }
}
