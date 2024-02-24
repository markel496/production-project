import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors'

interface FetchArticlesProps {
  page: number
}

export const fetchArticles = createAsyncThunk<
  Article[],
  FetchArticlesProps,
  ThunkConfig<string>
>('article/fetchArticles', async (props, thunkAPI) => {
  const { page = 1 } = props
  const { extra, rejectWithValue, getState } = thunkAPI

  const limit = getArticlesPageLimit(getState())

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _page: page,
        _limit: limit
      }
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
