/* eslint-disable react/display-name */
/* eslint-disable indent */
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import { profileReducer } from 'entities/Profile/model/slice/profileSlice'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { addNewCommentReducer } from 'features/addNewComment/model/slice/addNewCommentSlice'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices'
import { ReducersList } from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsPage: articleDetailsPageReducer
}

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator =>
  (StoryComponent) =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    ) // StoryComponent()
