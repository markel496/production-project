import {
  PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'

import { Comment } from '@/entities/Comment'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleCommentsSchema } from '../types/articleCommentsSchema'

const articleCommentsAdapter = createEntityAdapter<Comment>({
  // Assume IDs are stored in a field other than `book._id`
  selectId: (comment: Comment) => comment._id
})

//Создаю селектор, с помощью которого буду получать комментарии
export const getArticleComments =
  articleCommentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleComments || articleCommentsAdapter.getInitialState()
  )

const initialState =
  articleCommentsAdapter.getInitialState<ArticleCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  })

export const articleCommentsSlice = createSlice({
  name: 'articleComments',
  initialState,
  reducers: {
    // deleteArticleDetailsComment: (
    //   state,
    //   { payload: _id }: PayloadAction<string>
    // ) => {
    //   articleDetailsCommentsAdapter.removeOne(state, _id)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByArticleId.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(
      fetchCommentsByArticleId.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false
        articleCommentsAdapter.setAll(state, action.payload)
      }
    )
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const { reducer: articleCommentsReducer } = articleCommentsSlice
