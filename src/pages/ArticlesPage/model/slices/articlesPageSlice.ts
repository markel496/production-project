import {
  PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'

import { Article, ArticleView } from 'entities/Article'
import { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

const articlesAdapter = createEntityAdapter<Article>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (article) => article.id
})

//Создаю селектор, с помощью которого буду получать статьи
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articles || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.SMALL,
    ids: [],
    entities: {}
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    initView: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(
      fetchArticles.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        articlesAdapter.setAll(state, action.payload)
      }
    )
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const { actions: articlesPageActions } = articlesPageSlice

export const { reducer: articlesPageReducer } = articlesPageSlice
