import {
  PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'

import { Comment } from 'entities/Comment'
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

const articleDetailsCommentsAdapter = createEntityAdapter<Comment>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (comment: Comment) => comment.id
})

//Создаю селектор, с помощью которого буду получать комментарии
export const getArticleComments =
  articleDetailsCommentsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsComments ||
      articleDetailsCommentsAdapter.getInitialState()
  )

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState:
    articleDetailsCommentsAdapter.getInitialState<ArticleDetailsCommentsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
      }
    ),
  reducers: {
    // deleteArticleDetailsComment: (
    //   state,
    //   { payload: id }: PayloadAction<string>
    // ) => {
    //   articleDetailsCommentsAdapter.removeOne(state, id)
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
        articleDetailsCommentsAdapter.setAll(state, action.payload)
      }
    )
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

// export const { actions: articleDetailsCommentsActions } =
//   articleDetailsCommentsSlice

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice
