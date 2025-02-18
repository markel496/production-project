import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import { ArticleDetails } from '@/entities/Article'
import { Page } from '@/widgets/Page'

import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { ArticleComments } from '@/features/articleComments'
import { ArticleRating } from '@/features/articleRating'

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

import cls from './ArticleDetailsPage.module.scss'

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
      <ArticleRating className={cls.articleRating} id={id} />
      <ArticleRecommendationsList className={cls.recommended} id={id} />
      <ArticleComments id={id} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
