import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { memo, useCallback } from 'react'
import { ArticleList, ArticleView } from 'entities/Article'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles
} from '../model/slices/articlesPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchArticles } from '../model/services/fetchArticles/fetchArticles'
import { useSelector } from 'react-redux'
import {
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../model/selectors/articlesPageSelectors'
import { useTranslation } from 'react-i18next'
import { ViewSelector } from 'features/viewSelector'

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
  // const error = useSelector(getArticlesError)
  const view = useSelector(getArticlesPageView)

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch]
  )

  useInitialEffect(() => {
    dispatch(fetchArticles())
    dispatch(articlesPageActions.initView())
  })

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ViewSelector
          className={cls.viewSelector}
          view={view}
          onViewClick={onChangeView}
        />
        <ArticleList
          t={t}
          articles={articles}
          view={view}
          isLoading={isLoading}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
