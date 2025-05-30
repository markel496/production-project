import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react'

import { TFunction } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import { Text, TextSize, TextTheme } from '@/shared/ui/Text'

import { Article } from '../../model/types/article'

import { ArticleView } from '../../model/consts/articleConsts'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

import cls from './ArticleList.module.scss'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view: ArticleView
  recommended?: boolean
  target?: HTMLAttributeAnchorTarget
  t: TFunction<'articles', undefined>
}

const getSkeletons = (view: ArticleView, recommended?: boolean) => {
  if (recommended) {
    return [...new Array(4)].map((_, index) => (
      <ArticleListItemSkeleton key={index} view={view} />
    ))
  }
  return [...new Array(view === ArticleView.SMALL ? 9 : 3)].map((_, index) => (
    <ArticleListItemSkeleton key={index} view={view} />
  ))
}

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view, recommended, target, t } = props

  const renderArticles = useCallback(
    () =>
      articles.map((article: Article) => (
        <ArticleListItem
          key={article._id}
          article={article}
          view={view}
          target={target}
          t={t}
        />
      )),
    [articles, t, target, view]
  )

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className])}>
        <Text
          title={t('Статьи не найдены')}
          size={TextSize.L}
          theme={TextTheme.ERROR}
        />
      </div>
    )
  }

  return (
    <div
      className={classNames(cls.ArticleList, {}, [className])}
      data-testid="ArticleList"
    >
      {articles.length > 0 ? renderArticles() : null}
      {isLoading && getSkeletons(view, recommended)}
    </div>
  )
})
