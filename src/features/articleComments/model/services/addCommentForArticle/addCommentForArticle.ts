import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article'

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addNewCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addNewComment', async (comment, thunkAPI) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkAPI

  const articleId = getArticleDetailsData(getState())?._id
  const userId = getUserAuthData(getState())?._id

  if (!articleId || !userId) {
    return rejectWithValue('no data')
  }

  const newComment = {
    text: comment,
    user: userId,
    ref: 'ARTICLE'
  }

  try {
    const response = await extra.api.post<Comment>(
      `/articles/${articleId}/add_comment`,
      newComment
    )
    if (!response.data) {
      throw new Error()
    }

    dispatch(fetchCommentsByArticleId(articleId))

    return response.data
  } catch (e) {
    return rejectWithValue(String(e))
  }
})
