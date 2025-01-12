import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetails } from '@/entities/Article'
import { Page } from '@/widgets/Page'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { ArticleComments } from '@/features/articleComments'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props
  const { id } = useParams<{ id: string }>()

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetailsPageHeader id={id} />
      <ArticleDetails className={cls.articleDetails} id={id} />
      <ArticleRecommendationsList className={cls.recommended} id={id} />
      <ArticleComments id={id} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
