import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleDetails } from '@/entities/Article'
import { Page } from '@/widgets/Page'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { ArticleComments } from '@/features/articleComments'
import { ArticleRating } from '@/features/articleRating'
import { Card } from '@/shared/ui/Card'
import { ToggleFeatures } from '@/shared/lib/features'
import { Text, TextAlign } from '@/shared/ui/Text'

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetailsPageHeader id={id} />
      <ArticleDetails className={cls.module} id={id} />
      <ToggleFeatures
        feature="isArticleRatingEnabled"
        on={<ArticleRating className={cls.module} id={id} />}
        off={
          <Card className={cls.module}>
            <Text
              align={TextAlign.CENTER}
              title={t('Рейтинг скоро появится!')}
            />
          </Card>
        }
      />
      <ArticleRecommendationsList className={cls.module} id={id} />
      <ArticleComments id={id} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
