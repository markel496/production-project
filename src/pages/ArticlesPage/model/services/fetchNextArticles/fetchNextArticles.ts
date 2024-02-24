import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum
} from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'

export const fetchNextArticles = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('article/fetchNextArticles', async (_, thunkAPI) => {
  const { getState, dispatch } = thunkAPI

  const page = getArticlesPageNum(getState())
  const isLoading = getArticlesPageIsLoading(getState())
  const hasMore = getArticlesPageHasMore(getState())

  if (hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1))
    dispatch(fetchArticles({ page: page + 1 }))
  }
})
