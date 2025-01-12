import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails' //!!!
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addNewCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addNewComment', async (comment, thunkAPI) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkAPI

  const article = getArticleDetailsData(getState())
  const user = getUserAuthData(getState())

  if (!article || !user) {
    return rejectWithValue('no data')
  }

  const newComment = {
    text: comment,
    user: user._id,
    article: article._id
  }

  try {
    const response = await extra.api.post<Comment>('/comments', newComment)
    if (!response.data) {
      throw new Error()
    }

    dispatch(fetchCommentsByArticleId(article._id))

    return response.data
  } catch (e) {
    return rejectWithValue(String(e))
  }
})
