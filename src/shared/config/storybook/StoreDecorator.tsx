/* eslint-disable markel-plugin/public-api-imports */
/* eslint-disable indent */
// TODO
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
import { editableProfileCardReducer } from '@/features/editableProfileCard/model/slices/editableProfileCardSlice'
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
import { articleCommentsReducer } from '@/features/articleComments/model/slices/articleCommentsSlice'
import { ReducersList } from '@/shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slices/articlesPageSlice'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: editableProfileCardReducer,
  articleDetails: articleDetailsReducer,
  articleComments: articleCommentsReducer,
  articles: articlesPageReducer
}

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator =>
  (StoryComponent) => (
    <StoreProvider
      initialState={state}
      asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
      <StoryComponent />
    </StoreProvider>
  ) // StoryComponent()
