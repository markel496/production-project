import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ArticleList, ArticleView } from '@/entities/Article'
import { getArticles } from '../../model/slices/articlesPageSlice'
import {
  getArticlesPageError,
  getArticlesPageInited,
  getArticlesPageIsLoading
} from '../../model/selectors/articlesPageSelectors'
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text/Text'

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
