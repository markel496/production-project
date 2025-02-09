import type { Meta, StoryObj } from '@storybook/react'
import { ArticleRating } from './ArticleRating'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { mswLoader } from 'msw-storybook-addon'
import { http, HttpResponse, delay, HttpHandler } from 'msw'
import { RatingSchema } from '@/entities/Rating'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

const meta: Meta<typeof ArticleRating> = {
  title: 'features/ArticleRating',
  component: ArticleRating,
  parameters: {
    layout: 'padded'
  },
  args: {
    id: '1'
  },
  decorators: [StoreDecorator({ user: { authData: { _id: '1' } } })],
  loaders: [mswLoader],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleRating>

const rating: RatingSchema = {
  _id: '1',
  autor: 'Ivan Markelov',
  dataId: '1',
  rating: 4
}

const url = {
  get: __API__ + '/articles/1/rating',
  post: __API__ + '/articles/1/add_feedback'
}

const getAricleRatingHandler = (rating?: RatingSchema): HttpHandler =>
  http.get(url.get, () => HttpResponse.json(rating ? rating : null))

const addArticleRatingHandler: HttpHandler = http.post(url.post, () =>
  HttpResponse.json({ success: true })
)

const loadingHandler: HttpHandler = http.get(url.get, () => delay('infinite'))

export const RatedPrimary: Story = {
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler(rating)]
    }
  }
}

export const RatedDark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler({ ...rating, rating: 5 })]
    }
  }
}

export const RatedGreen: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)],
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler({ ...rating, rating: 3 })]
    }
  }
}

//===============================================================================================

export const LoadingPrimary: Story = {
  parameters: {
    msw: {
      handlers: [loadingHandler]
    }
  }
}

export const LoadingDark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
  parameters: {
    msw: {
      handlers: [loadingHandler]
    }
  }
}

export const LoadingGreen: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)],
  parameters: {
    msw: {
      handlers: [loadingHandler]
    }
  }
}

//===============================================================================================

export const NoRatedPrimary: Story = {
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler(), addArticleRatingHandler]
    }
  }
}

export const NoRatedDark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler(), addArticleRatingHandler]
    }
  }
}

export const NoRatedGreen: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)],
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler(), addArticleRatingHandler]
    }
  }
}
