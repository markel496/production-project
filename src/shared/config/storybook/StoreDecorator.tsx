/* eslint-disable react/display-name */
/* eslint-disable indent */
import { DeepPartial } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'

export const StoreDecorator =
  (state: DeepPartial<StateSchema>): Decorator =>
  (StoryComponent) =>
    (
      <StoreProvider initialState={state}>
        <StoryComponent />
      </StoreProvider>
    ) // StoryComponent()
