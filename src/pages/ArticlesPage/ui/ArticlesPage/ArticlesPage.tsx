import { memo, useCallback } from 'react'

import { useSelector } from 'react-redux'

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { classNames } from '@/shared/lib/classNames/classNames'

import { Page } from '@/widgets/Page'
import { ArticlesPageGreeting } from '@/features/articlesPageGreeting'

import { getArticlesPageView } from '../../model/selectors/articlesPageSelectors'

import { articlesPageReducer } from '../../model/slices/articlesPageSlice'

import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'

import cls from './ArticlesPage.module.scss'

const initialReducers: ReducersList = {
  articles: articlesPageReducer
}

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props

  const view = useSelector(getArticlesPageView)
  const dispatch = useAppDispatch()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticles())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage())
  })

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
        isSaveScroll
        data-testid="ArticlesPage"
      >
        <ArticlesPageFilters className={cls.filters} view={view} />
        <ArticleInfiniteList view={view} />
        <ArticlesPageGreeting />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
