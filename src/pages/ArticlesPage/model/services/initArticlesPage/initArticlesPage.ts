import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'

import { SortOrder } from '@/shared/types/sort'

import { ArticleSortField, ArticleType } from '@/entities/Article'

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/init', async (_, thunkAPI) => {
  const { getState, dispatch } = thunkAPI

  const inited = getArticlesPageInited(getState())

  if (!inited) {
    //можно вызвать хук useSearchParams() в ArticlesPage и передать сюда аргументом searchParams
    const searchParams = new URLSearchParams(window.location.search)

    const orderFromUrl = searchParams.get('order') as SortOrder
    const sortFromUrl = searchParams.get('sort') as ArticleSortField
    const searchFromUrl = searchParams.get('search')
    const typeFromUrl = searchParams.get('type') as ArticleType

    if (orderFromUrl) {
      dispatch(articlesPageActions.setOrder(orderFromUrl))
    }

    if (sortFromUrl) {
      dispatch(articlesPageActions.setSort(sortFromUrl))
    }

    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl))
    }

    if (typeFromUrl) {
      dispatch(articlesPageActions.setType(typeFromUrl))
    }

    dispatch(articlesPageActions.initView())
    dispatch(fetchArticles({}))
  }
})
