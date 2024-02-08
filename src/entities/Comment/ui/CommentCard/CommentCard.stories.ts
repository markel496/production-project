import type { Meta, StoryObj } from '@storybook/react'
import { CommentCard } from './CommentCard'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Comment } from '../../model/types/comment'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

const meta: Meta<typeof CommentCard> = {
  title: 'Entities/Comment/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  decorators: [StoreDecorator({ user: { authData: { id: '1' } } })],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CommentCard>

const comment: Comment = {
  id: '1',
  user: {
    id: '1',
    username: 'Commentator',
    avatar:
      'https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg'
  },
  text: 'HOLLA420',
  createdAt: '01.01.1996',
  edited: true
}

export const Primary: Story = {
  args: {
    comment
  }
}

export const Dark: Story = {
  args: {
    comment
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
