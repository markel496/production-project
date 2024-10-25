import type { Meta, StoryObj } from '@storybook/react'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import { ArticleType } from 'entities/Article'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

const meta: Meta<typeof ArticleRecommendationsList> = {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleRecommendationsList>

const article = {
  _id: '1',
  title: 'Javascript news',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '2024-06-06T17:35:45.931Z',
  type: [ArticleType.IT]
}

const articles = [...new Array(4)].map((_, idx) => {
  return { ...article, _id: String(idx) }
})

export const Primary: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            data: articles
          }
        }
      }
    })
  ]
}

export const Dark: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            data: articles
          }
        }
      }
    })
  ]
}

export const Green: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            data: articles
          }
        }
      }
    })
  ]
}

export const Loading: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            status: QueryStatus.pending
          }
        }
      }
    })
  ]
}
export const LoadingDark: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            status: QueryStatus.pending
          }
        }
      }
    })
  ]
}
export const LoadingGreen: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({
      api: {
        queries: {
          'getArticleRecommendations({"limit":4})': {
            status: QueryStatus.pending
          }
        }
      }
    })
  ]
}
