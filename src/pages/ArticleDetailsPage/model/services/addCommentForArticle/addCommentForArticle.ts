import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Comment } from 'entities/Comment'
import { getUserAuthData } from 'entities/User'
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails' //!!!
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'
import { AddNewCommentArgs } from 'features/addNewComment'

export const addNewCommentForArticle = createAsyncThunk<
  Comment,
  AddNewCommentArgs,
  ThunkConfig<string>
>('articleDetails/addNewComment', async (commentData, thunkAPI) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkAPI

  const commentId = Math.random().toString(36).substring(2) //уникальный ключ в виде строки
  const article = getArticleDetailsData(getState())
  const user = getUserAuthData(getState())

  if (!article || !user) {
    return rejectWithValue('no data')
  }

  const newComment = {
    id: commentId,
    text: commentData.text,
    createdAt: commentData.createdAt,
    articleId: article.id,
    userId: user.id,
    edited: false
  }

  try {
    const response = await extra.api.post<Comment>('/comments', newComment)
    if (!response.data) {
      throw new Error()
    }

    dispatch(fetchCommentsByArticleId(article.id))

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
