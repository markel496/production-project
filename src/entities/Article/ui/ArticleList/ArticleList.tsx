import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { TFunction } from 'react-i18next'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view: ArticleView
  t: TFunction<'articles', undefined>
}

const getSkeletons = (view: ArticleView) =>
  [...new Array(view === ArticleView.SMALL ? 9 : 3)].map((_, index) => (
    <ArticleListItemSkeleton key={index} view={view} />
  ))

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view, t } = props

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem key={article.id} article={article} view={view} t={t} />
    )
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  )
})
