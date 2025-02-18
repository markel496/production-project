import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article'

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const deleteArticleComment = createAsyncThunk<
  Comment,
  string | undefined,
  ThunkConfig<string>
>('articleDetails/deleteComment', async (commentId, thunkAPI) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkAPI

  const article = getArticleDetailsData(getState())
  const user = getUserAuthData(getState())

  if (!commentId || !article || !user) {
    return rejectWithValue('no data')
  }

  try {
    const response = await extra.api.delete<Comment>(`/comments/${commentId}`)
    if (!response.data) {
      throw new Error()
    }

    dispatch(fetchCommentsByArticleId(article._id))

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
