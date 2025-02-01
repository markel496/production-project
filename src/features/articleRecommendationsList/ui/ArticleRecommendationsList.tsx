import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticleRecommendationsList.module.scss'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { ArticleList, ArticleView } from '@/entities/Article'
import { useArticleRecommendationsList } from '../api/articleRecommendationsApi'

interface ArticleRecommendationsListProps {
  className?: string
  id?: string //Получаю id текущей открытой статьи, чтобы в рекомендациях ее не было
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className, id } = props
    const { t } = useTranslation()

    const { data: articles, isLoading } = useArticleRecommendationsList({
      id,
      limit: 4
    })

    return (
      <div className={className}>
        <Text
          className={cls.recommendedTitle}
          title={t('Рекомендуем')}
          size={TextSize.L}
        />

        <ArticleList
          className={cls.recommended}
          t={t}
          articles={articles ?? []}
          view={ArticleView.SMALL}
          isLoading={isLoading}
          recommended
          target="_blank"
        />
      </div>
    )
  }
)
