import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import avatar from '@/shared/assets/tests/avatar.jpg'

import { Comment } from '../../model/types/comment'

import { CommentCard } from './CommentCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CommentCard> = {
  title: 'Entities/Comment/CommentCard',
  component: CommentCard,
  tags: ['autodocs'],
  decorators: [StoreDecorator({ user: { authData: { _id: '1' } } })],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CommentCard>

const comment: Comment = {
  _id: '1',
  user: {
    _id: '1',
    username: 'Commentator',
    avatar
  },
  text: 'HOLLA420',
  createdAt: '24 окт. 2024 г. в 21:00',
  updatedAt: '24 окт. 2024 г. в 21:00'
}

export const Primary: Story = {
  args: {
    comment
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}

export const Edited: Story = {
  args: {
    comment: { ...comment, updatedAt: '24 окт. 2024 г. в 21:25' }
  }
}
