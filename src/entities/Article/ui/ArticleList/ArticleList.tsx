import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { TFunction } from 'react-i18next'
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text'
import { VirtuosoGrid } from 'react-virtuoso'
import { PAGE_ID } from 'widgets/Page/ui/Page'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
  virtualized?: boolean
  t: TFunction<'articles', undefined>
}

const getSkeletons = (virtualized: boolean | undefined, view: ArticleView) => {
  if (virtualized) {
    return (
      <div style={{ marginTop: 30 }} className={cls.ArticleList}>
        {[...new Array(view === ArticleView.SMALL ? 9 : 3)].map((_, index) => (
          <ArticleListItemSkeleton key={index} view={view} />
        ))}
      </div>
    )
  } else {
    return [...new Array(view === ArticleView.SMALL ? 9 : 3)].map(
      (_, index) => <ArticleListItemSkeleton key={index} view={view} />
    )
  }
}

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view, target, virtualized, t } = props

  const renderArticles = useCallback(
    (virtualized: boolean | undefined) => {
      if (virtualized) {
        return (
          <VirtuosoGrid
            style={{ width: '100%' }}
            useWindowScroll
            listClassName={cls.ArticleList}
            customScrollParent={document.getElementById(PAGE_ID) as HTMLElement}
            data={articles}
            itemContent={(_, article: Article) => (
              <ArticleListItem
                key={article._id}
                article={article}
                view={view}
                target={target}
                t={t}
              />
            )}
          />
        )
      } else {
        return articles.map((article: Article) => (
          <ArticleListItem
            key={article._id}
            article={article}
            view={view}
            target={target}
            t={t}
          />
        ))
      }
    },
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
      className={classNames(`${virtualized ? '' : cls.ArticleList}`, {}, [
        className
      ])}
    >
      {articles.length > 0 ? renderArticles(virtualized) : null}
      {isLoading && getSkeletons(virtualized, view)}
    </div>
  )
})
