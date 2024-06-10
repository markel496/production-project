import { StateSchema } from 'app/providers/StoreProvider'

export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.isLoading || false

export const getArticleRecommendationsError = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.error

export const getArticleRecommendationsInited = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?._inited
