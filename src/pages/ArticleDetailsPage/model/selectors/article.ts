import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import { getArticleDetailsData } from 'entities/Article'

export const getCanEditArticle = createSelector(
  getUserAuthData,
  getArticleDetailsData,
  (user, articleDetails) => {
    if (!user || !articleDetails) {
      return false
    }
    return user.id === articleDetails.user.id
  }
)
