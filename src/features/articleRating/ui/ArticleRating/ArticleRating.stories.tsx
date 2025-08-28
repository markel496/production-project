import { mswLoader } from 'msw-storybook-addon'

import { http, HttpResponse, delay, HttpHandler } from 'msw'

import { RatingSchema } from '@/entities/Rating'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { ArticleRating } from './ArticleRating'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ArticleRating> = {
  title: 'features/ArticleRating',
  component: ArticleRating,

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

export const Rated: Story = {
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler(rating)]
    }
  }
}

//===============================================================================================

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [loadingHandler]
    }
  }
}

//===============================================================================================

export const NoRated: Story = {
  parameters: {
    msw: {
      handlers: [getAricleRatingHandler(), addArticleRatingHandler]
    }
  }
}
