import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'

export const getUserAuthData = (state: StateSchema) => state.user.authData

export const getUserId = createSelector(
  getUserAuthData,
  (authData) => authData?._id
)
