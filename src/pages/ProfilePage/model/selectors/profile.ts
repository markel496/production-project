import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import { getProfileInitialData } from 'entities/Profile'

export const getCanEditProfile = createSelector(
  getUserAuthData,
  getProfileInitialData,
  (userAuthData, profileInitialData) => {
    if (!userAuthData || !profileInitialData) {
      return false
    }
    return userAuthData.id === profileInitialData.id
  }
)
