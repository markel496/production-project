import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Rating } from '@/entities/Rating'

import { getUserId } from '@/entities/User'
import { Loader } from '@/shared/ui/Loader'

import {
  useGetArticleRating,
  useRateArticle,
  useResetRateArticle
} from '../../api/articleRatingApi'

import cls from './ArticleRating.module.scss'

interface ArticleRatingProps {
  className?: string
  id?: string
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, id } = props
  const { t } = useTranslation('articles')

  const user = useSelector(getUserId)

  const {
    data: articleRating,
    isLoading,
    isFetching,
    refetch
  } = useGetArticleRating({
    id,
    user
  })

  const [rateArticle, { isLoading: isLoadingforAdd }] = useRateArticle()

  const [resetRateArticle, { isLoading: isLoadingforReset }] =
    useResetRateArticle()

  const handleRateArticle = useCallback(
    async (rating: number, review?: string) => {
      try {
        await rateArticle({
          id,
          autor: user,
          ref: 'ARTICLE',
          rating,
          review
        })
        refetch()
      } catch (e) {
        console.log(e)
      }
    },
    [id, user, rateArticle, refetch]
  )

  const handleResetRateArticle = useCallback(async () => {
    try {
      await resetRateArticle(articleRating?._id)
      refetch()
    } catch (e) {
      console.log(e)
    }
  }, [resetRateArticle, refetch, articleRating?._id])

  if (isLoading || isLoadingforAdd || isLoadingforReset || isFetching) {
    return (
      <div className={cls.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <Rating
      className={className}
      rating={articleRating?.rating}
      title={
        articleRating ? t('Спасибо, что оценили статью!') : t('Как Вам статья?')
      }
      hasFeedback
      feedbackTitle={t('Оставьте отзыв о статье')}
      placeholder={t('Напишите что-нибудь...')}
      onAccept={handleRateArticle}
      onReset={handleResetRateArticle}
    />
  )
})
