import type { Meta, StoryObj } from '@storybook/react'
import ArticleDetailsPage from './ArticleDetailsPage'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import { ArticleDetailsCommentsSchema } from '../../model/types/articleDetailsCommentsSchema'

const meta: Meta<typeof ArticleDetailsPage> = {
  title: 'Pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleDetailsPage>

const articleDetailsComments: ArticleDetailsCommentsSchema = {
  ids: ['1', '2', '3'],
  entities: {
    '1': {
      id: '1',
      text: 'Комментарий 1',
      user: {
        id: '1',
        username: 'User',
        avatar:
          'https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg'
      },
      createdAt: '01.01.1996',
      edited: true
    },
    '2': {
      id: '2',
      text: 'Комментарий 2',
      user: {
        id: '2',
        username: 'User 2'
      },
      createdAt: '01.01.1996',
      edited: false
    }
  }
}

export const Light: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      articleDetailsPage: { comments: articleDetailsComments }
    })
  ]
}

export const Dark: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      articleDetailsPage: { comments: articleDetailsComments }
    })
  ]
}
