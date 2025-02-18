import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment, EditCommentArgs } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article'

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const editArticleComment = createAsyncThunk<
  Comment,
  EditCommentArgs,
  ThunkConfig<string>
>('articleDetails/editComment', async (commentData, thunkAPI) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkAPI

  const article = getArticleDetailsData(getState())
  const user = getUserAuthData(getState())

  if (!article || !user) {
    return rejectWithValue('no data')
  }

  try {
    const response = await extra.api.patch<Comment>(
      `/comments/${commentData._id}`,
      commentData
    )
    if (!response.data) {
      throw new Error()
    }

    dispatch(fetchCommentsByArticleId(article._id))

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
