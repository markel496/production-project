import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType
} from '../../selectors/articlesPageSelectors'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'

interface FetchArticlesReturned {
  articles: Article[]
  articlesTotalCount: number
}

interface FetchArticlesProps {
  replace?: boolean
}

export const fetchArticles = createAsyncThunk<
  FetchArticlesReturned,
  FetchArticlesProps,
  ThunkConfig<string>
>('articlesPage/fetchArticles', async (_, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI

  const page = getArticlesPageNum(getState())
  const limit = getArticlesPageLimit(getState())
  const sort = getArticlesPageSort(getState())
  const order = getArticlesPageOrder(getState())
  const search = getArticlesPageSearch(getState())
  const type = getArticlesPageType(getState())

  try {
    addQueryParams({
      sort,
      order,
      search,
      type
    })

    const response = await extra.api.get<FetchArticlesReturned>('/articles', {
      params: {
        page,
        limit,
        sort,
        order,
        type,
        search
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
