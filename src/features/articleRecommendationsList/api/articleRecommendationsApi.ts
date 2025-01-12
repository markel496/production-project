import { Article } from '@/entities/Article'
import { rtkApi } from '@/shared/api/rtkApi'

interface GetArticleRecommendationsArgs {
  id?: string
  limit: number
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendations: build.query<
      Article[],
      GetArticleRecommendationsArgs
    >({
      query: (args) => {
        const { id, limit } = args
        return {
          url: `/articles/${id}/recommended`,
          params: {
            limit
          }
        }
      }
    })
  })
})

export const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsQuery
