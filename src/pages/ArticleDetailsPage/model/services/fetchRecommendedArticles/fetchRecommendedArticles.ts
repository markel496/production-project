import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'

export const fetchRecommendedArticles = createAsyncThunk<
  Article[],
  string | undefined,
  ThunkConfig<string>
>(
  'articleDetailsPage/fetchRecommendedArticles',
  async (currentArticleDetailsId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
      const response = await extra.api.get<Article[]>(
        // Передаю id текущей открытой статьи, чтобы в рекомендациях ее не было
        `/articles/${currentArticleDetailsId}/recommended`,
        {
          params: {
            limit: 4
          }
        }
      )

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
