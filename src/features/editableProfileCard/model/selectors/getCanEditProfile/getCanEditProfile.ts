import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from '@/entities/User'

import { getProfileInitialData } from '../getProfileInitialData/getProfileInitialData'

export const getCanEditProfile = createSelector(
  getUserAuthData,
  getProfileInitialData,
  (userAuthData, profileInitialData) => {
    if (!userAuthData || !profileInitialData) {
      return false
    }
    return userAuthData._id === profileInitialData.id
  }
)
