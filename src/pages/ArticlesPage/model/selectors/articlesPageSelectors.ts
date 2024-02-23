import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'

export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articles?.isLoading || false

export const getArticlesPageError = (state: StateSchema) =>
  state.articles?.error

export const getArticlesPageView = (state: StateSchema) =>
  state.articles?.view || ArticleView.SMALL
