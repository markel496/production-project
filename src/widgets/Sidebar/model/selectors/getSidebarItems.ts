import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from '@/entities/User'


import MainPageIcon from '@/shared/assets/icons/main-20-20.svg'
import AboutPageIcon from '@/shared/assets/icons/about-20-20.svg'
import ArticlesPageIcon from '@/shared/assets/icons/article-20-20.svg'
import { routePath } from '@/shared/const/router'

import { SidebarItemType } from '../types/sidebar'

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userAuthData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: routePath.main,
        text: 'Главная',
        Icon: MainPageIcon
      },
      {
        path: routePath.about,
        text: 'О сайте',
        Icon: AboutPageIcon
      }
    ]

    if (userAuthData) {
      sidebarItemsList.push({
        path: routePath.articles,
        text: 'Статьи',
        Icon: ArticlesPageIcon,
        authOnly: true
      })
    }
    return sidebarItemsList
  }
)
