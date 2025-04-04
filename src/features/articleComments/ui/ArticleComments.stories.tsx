import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import avatar from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { ArticleCommentsSchema } from '../model/types/articleCommentsSchema'

import { ArticleComments } from './ArticleComments'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleComments> = {
  title: 'features/ArticleComments',
  component: ArticleComments,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleComments>

const comments: ArticleCommentsSchema = {
  ids: ['1', '2'],
  entities: {
    '1': {
      _id: '1',
      text: 'Комментарий 1',
      user: {
        _id: '1',
        username: 'User',
        avatar
      },
      createdAt: '24 окт. 2024 г. в 22:28',
      updatedAt: '24 окт. 2024 г. в 22:28'
    },
    '2': {
      _id: '2',
      text: 'Комментарий 2',
      user: {
        _id: '2',
        username: 'User 2'
      },
      createdAt: '24 окт. 2024 г. в 22:30',
      updatedAt: 'fasf'
    }
  }
}

export const Primary: Story = {
  decorators: [
    StoreDecorator({
      articleComments: comments
    })
  ]
}

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      articleComments: comments
    })
  ]
}

export const Green: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({
      articleComments: comments
    })
  ]
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      articleComments: { ids: [], entities: {}, isLoading: true }
    })
  ]
}
