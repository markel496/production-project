import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'

export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articles?.isLoading || false

export const getArticlesPageError = (state: StateSchema) =>
  state.articles?.error

export const getArticlesPageView = (state: StateSchema) =>
  state.articles?.view || ArticleView.SMALL

export const getArticlesPageNum = (state: StateSchema) =>
  state.articles?.page || 1

export const getArticlesPageLimit = (state: StateSchema) =>
  state.articles?.limit || 9

export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articles?.hasMore
