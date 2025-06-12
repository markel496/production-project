import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { buildSelector } from '@/shared/lib/store'

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

export const getArticlesPageSort = (state: StateSchema) =>
  state.articles?.sort ?? ArticleSortField.VIEWS

export const getArticlesPageOrder = (state: StateSchema) =>
  state.articles?.order ?? 'asc'

export const getArticlesPageSearch = (state: StateSchema) =>
  state.articles?.search ?? ''

export const getArticlesPageType = (state: StateSchema) =>
  state.articles?.type ?? ArticleType.ALL

export const getArticlesPageInited = (state: StateSchema) =>
  state.articles?._inited

export const [useGetArticleById] = buildSelector(
  (state: StateSchema, id: string) => state.articles?.entities[id]
)
