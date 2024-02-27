import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
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
    dispatch(articlesPageActions.initView())
    dispatch(fetchArticles({ page: 1 }))
  }
})
