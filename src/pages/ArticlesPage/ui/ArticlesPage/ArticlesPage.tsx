import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { memo, useCallback } from 'react'
import { ArticleList } from 'entities/Article'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import {
  articlesPageReducer,
  getArticles
} from '../../model/slices/articlesPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useSelector } from 'react-redux'
import {
  getArticlesPageInited,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page'
import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'

const initialReducers: ReducersList = {
  articles: articlesPageReducer
}

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { t } = useTranslation('articles')
  const { className } = props

  const dispatch = useAppDispatch()

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const inited = useSelector(getArticlesPageInited)
  // const error = useSelector(getArticlesError)

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
      >
        <ArticlesPageFilters className={cls.filters} view={view} />
        {inited && (
          <ArticleList
            t={t}
            articles={articles}
            view={view}
            isLoading={isLoading}
          />
        )}
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
