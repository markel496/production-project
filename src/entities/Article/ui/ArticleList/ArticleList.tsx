import { HTMLAttributeAnchorTarget, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { TFunction } from 'react-i18next'
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
  t: TFunction<'articles', undefined>
}

const getSkeletons = (view: ArticleView) =>
  [...new Array(view === ArticleView.SMALL ? 9 : 3)].map((_, index) => (
    <ArticleListItemSkeleton key={index} view={view} />
  ))

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view, target, t } = props

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        key={article._id}
        article={article}
        view={view}
        target={target}
        t={t}
      />
    )
  }

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
    <div className={classNames(cls.ArticleList, {}, [className])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  )
})
