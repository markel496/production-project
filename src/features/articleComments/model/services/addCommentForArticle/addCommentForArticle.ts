import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'

interface AddNewCommentForArticleArgs {
  comment: string
  id?: string
}

export const addNewCommentForArticle = createAsyncThunk<
  Comment,
  AddNewCommentForArticleArgs,
  ThunkConfig<string>
>(
  'articleDetails/addNewComment',
  async ({ comment, id: articleId }, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI

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

      return response.data
    } catch (e) {
      return rejectWithValue(String(e))
    }
  }
)
