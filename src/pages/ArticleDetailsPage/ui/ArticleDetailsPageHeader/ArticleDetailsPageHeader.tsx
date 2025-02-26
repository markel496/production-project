import { memo, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Button } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/classNames/classNames'

import { HStack } from '@/shared/ui/Stack'
import { getRouteArticles, getRouteArticleEdit } from '@/shared/const/router'

import { getCanEditArticle } from '../../model/selectors/getCanEditArticle'

import cls from './ArticleDetailsPageHeader.module.scss'

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
      navigate(getRouteArticles())
    }, [navigate])

    const onEditArticle = useCallback(() => {
      if (id) navigate(getRouteArticleEdit(id))
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
