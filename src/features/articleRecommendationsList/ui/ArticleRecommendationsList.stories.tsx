import { mswLoader } from 'msw-storybook-addon'

import { http, HttpResponse, delay } from 'msw'

import { ArticleType } from '@/entities/Article'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { ArticleRecommendationsList } from './ArticleRecommendationsList'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleRecommendationsList> = {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  args: {
    id: '1'
  },

  decorators: [StoreDecorator({})],
  loaders: [mswLoader],
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
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/articles/1/recommended', () => {
          return HttpResponse.json(articles)
        })
      ]
    }
  }
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/articles/1/recommended', () => {
          return delay('infinite')
        })
      ]
    }
  }
}
