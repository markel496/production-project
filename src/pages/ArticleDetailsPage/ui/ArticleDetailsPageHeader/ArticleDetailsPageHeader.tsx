import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetailsPageHeader.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCanEditArticle } from '../../model/selectors/getCanEditArticle'
import { HStack } from '@/shared/ui/Stack'
import { routePath } from '@/shared/const/router'

interface ArticleDetailsPageHeaderProps {
  className?: string
  id?: string
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className, id } = props
    const { t } = useTranslation('articles')

    const canEdit = useSelector(getCanEditArticle)

    const navigate = useNavigate()

    const onBackToList = useCallback(() => {
      navigate(routePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
      navigate(`${routePath.article_details}${id}/edit`)
    }, [navigate, id])

    return (
      <HStack
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
        {canEdit && (
          <Button className={cls.editBtn} onClick={onEditArticle}>
            {t('Редактировать')}
          </Button>
        )}
      </HStack>
    )
  }
)
