import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema'
import { Article } from 'entities/Article'
import { fetchRecommendedArticles } from '../services/fetchRecommendedArticles/fetchRecommendedArticles'

const articleDetailsRecommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article._id
})

export const getArticleRecommendations =
  articleDetailsRecommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommendations ||
      articleDetailsRecommendationsAdapter.getInitialState()
  )

const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendations',
  initialState:
    articleDetailsRecommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        _inited: false
      }
    ),
  reducers: {
    //Для того, чтобы не было надписи "статьи не найдены" при первом рендере
    initRecommendations: (state) => {
      state._inited = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecommendedArticles.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })

    builder.addCase(fetchRecommendedArticles.fulfilled, (state, action) => {
      state.isLoading = false
      articleDetailsRecommendationsAdapter.setAll(state, action.payload)
    })

    builder.addCase(fetchRecommendedArticles.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const {
  reducer: articleDetailsRecommendationsReducer,
  actions: articleDetailsRecommendationsActions
} = articleDetailsRecommendationsSlice
