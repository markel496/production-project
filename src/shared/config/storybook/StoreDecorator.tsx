/* eslint-disable react/display-name */
/* eslint-disable indent */
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { profileReducer } from 'entities/Profile'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
  profile: profileReducer
}

export const StoreDecorator =
  (
    state: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
  ): Decorator =>
  (StoryComponent) =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    ) // StoryComponent()
