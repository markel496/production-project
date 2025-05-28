import { RatingSchema } from '@/entities/Rating'
import { rtkApi } from '@/shared/api/rtkApi'

interface GetArticleRatingArgs {
  id?: string
  user?: string
}

interface RateArticleArgs {
  id?: string
  autor?: string
  ref: 'ARTICLE'
  rating: number
  review?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<RatingSchema, GetArticleRatingArgs>({
      query: ({ id, user }) => ({
        url: `/articles/${id}/rating`,
        params: {
          user
        }
      })
    }),
    rateArticle: build.mutation<void, RateArticleArgs>({
      query: ({ id, autor, rating, ref, review }) => ({
        url: `/articles/${id}/add_feedback`,
        method: 'POST',
        body: {
          autor,
          ref,
          rating,
          review
        }
      })
    }),
    resetRateArticle: build.mutation<void, string | undefined>({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation
export const useResetRateArticle = articleRatingApi.useResetRateArticleMutation
