import type { Meta, StoryObj } from '@storybook/react'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { ArticleType } from '@/entities/Article'
import { mswLoader } from 'msw-storybook-addon'
import { http, HttpResponse, delay } from 'msw'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

const meta: Meta<typeof ArticleRecommendationsList> = {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  args: {
    id: '1'
  },
  parameters: {
    layout: 'padded'
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

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
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

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)],
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
export const LoadingDark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
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
export const LoadingGreen: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)],
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
