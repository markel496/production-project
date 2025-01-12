import {
  PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'

import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView
} from '@/entities/Article'
import { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { SortOrder } from '@/shared/types/sort'

const articlesAdapter = createEntityAdapter<Article>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (article) => article._id
})

//Создаю селектор, с помощью которого буду получать статьи
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articles || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    limit: 9,
    order: 'asc',
    sort: ArticleSortField.CREATED,
    search: '',
    type: ArticleType.ALL,
    ids: [],
    entities: {},
    _inited: false
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },

    initView: (state) => {
      const view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView
      state.view = view
      state.limit = view === ArticleView.SMALL ? 9 : 4
      state._inited = true
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state, action) => {
      state.error = undefined
      state.isLoading = true

      if (action.meta.arg.replace) {
        articlesAdapter.removeAll(state)
      }
    })
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasMore =
        action.payload.articles.length >= state.limit &&
        action.payload.articlesTotalCount > state.limit * state.page

      if (action.meta.arg.replace) {
        articlesAdapter.setAll(state, action.payload.articles)
      } else {
        articlesAdapter.setMany(state, action.payload.articles)
      }
    })
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const { actions: articlesPageActions } = articlesPageSlice

export const { reducer: articlesPageReducer } = articlesPageSlice
