import { rtkApi } from 'shared/api/rtkApi'

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendations: build.query({
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
