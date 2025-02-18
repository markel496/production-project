import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>('article/fetchCommentsByArticleId', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  if (!articleId) {
    return rejectWithValue('error')
  }

  try {
    const response = await extra.api.get<Comment[]>(
      `/articles/${articleId}/comments`
    )

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
