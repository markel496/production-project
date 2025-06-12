import { Decorator } from '@storybook/react'

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { editableProfileCardReducer } from '@/features/editableProfileCard/testing'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { articleCommentsReducer } from '@/features/articleComments/testing'
import { ReducersList } from '@/shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageReducer } from '@/pages/ArticlesPage/testing'

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
