import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { ArticleList, ArticleView } from '@/entities/Article'

import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text'

import { getArticles } from '../../model/slices/articlesPageSlice'
import {
  getArticlesPageError,
  getArticlesPageInited,
  getArticlesPageIsLoading,
  useGetArticleById
} from '../../model/selectors/articlesPageSelectors'

interface ArticleInfiniteListProps {
  view: ArticleView
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { view } = props
  const { t } = useTranslation('articles')

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)

  const inited = useSelector(getArticlesPageInited)

  const exampleArticle = useGetArticleById('66129e44c981bbf84c7733ed')
  console.log(exampleArticle)

  if (!inited) return null

  if (error) {
    return (
      <Text
        text={t('Произошла ошибка при загрузке статей')}
        size={TextSize.L}
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
      />
    )
  }

  return (
    <ArticleList t={t} articles={articles} view={view} isLoading={isLoading} />
  )
})
