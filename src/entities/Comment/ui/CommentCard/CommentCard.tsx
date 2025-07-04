import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import moment from 'moment'

import { Avatar } from '@/shared/ui/Avatar'
import { Text, TextSize } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import { AppLink } from '@/shared/ui/AppLink'

import { getUserAuthData } from '@/entities/User'

import { HStack, VStack } from '@/shared/ui/Stack'

import { classNames } from '@/shared/lib/classNames/classNames'
import 'moment/locale/ru'
import { Card, CardTheme } from '@/shared/ui/Card'
import { getRouteProfile } from '@/shared/const/router'

import { EditCommentForm } from '../EditCommentForm/EditCommentForm'
import { CommentEditBtn } from '../CommentEditBtn/CommentEditBtn'
import { CommentDeleteBtn } from '../CommentDeleteBtn/CommentDeleteBtn'

import { Comment, EditCommentArgs } from '../../model/types/comment'

import cls from './CommentCard.module.scss'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
  onDeleteComment?: () => void
  onEditComment?: (commentData: EditCommentArgs) => void
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { t, i18n } = useTranslation('comments')
  const { className, comment, isLoading, onDeleteComment, onEditComment } =
    props

  const [isEditing, setIsEditing] = useState(false)

  const authData = useSelector(getUserAuthData)
  const canEdit = comment?.user._id === authData?._id

  const onChangeComment = useCallback(() => {
    setIsEditing(true)
  }, [])

  const onCancelEditing = useCallback(() => {
    setIsEditing(false)
  }, [])

  const createdAtComment = useMemo(() => {
    if (comment) {
      return __PROJECT__ !== 'storybook'
        ? comment.createdAt === comment.updatedAt
          ? moment(comment.createdAt)
              .locale(i18n.language)
              .format(i18n.language === 'ru' ? 'll в LT' : 'LLL')
          : moment(comment.createdAt)
              .locale(i18n.language)
              .format(i18n.language === 'ru' ? 'll в LT' : 'LLL') + t(' (ред.)')
        : comment.createdAt === comment.updatedAt
          ? comment.createdAt
          : comment.createdAt + ' (ред.)'
    }
  }, [comment, i18n.language, t])

  if (isLoading) {
    return (
      <Card
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
        theme={CardTheme.OUTLINE}
      >
        <HStack className={cls.header} justify="start" gap="10">
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width="30%" height={20} />
        </HStack>
        <Skeleton className={cls.createdAtSkeleton} width={120} height={15} />
        <Skeleton height={40} />
      </Card>
    )
  }

  if (!comment) return null

  return (
    <Card
      className={classNames(cls.CommentCard, {}, [className])}
      theme={CardTheme.OUTLINE}
      data-testid="CommentCard"
    >
      <HStack className={cls.header} justify="between">
        <VStack>
          <AppLink
            className={cls.profile}
            to={getRouteProfile(comment.user._id)}
          >
            <Avatar alt={t('Аватар')} size={30} src={comment.user.avatar} />
            <Text className={cls.username} title={comment.user.username} />
          </AppLink>

          <Text size={TextSize.S} text={createdAtComment} />
        </VStack>
        {canEdit && (
          <HStack gap="10">
            {!isEditing && <CommentEditBtn onChangeComment={onChangeComment} />}

            <CommentDeleteBtn onDeleteComment={onDeleteComment} />
          </HStack>
        )}
      </HStack>
      {!isEditing ? (
        <Text text={comment.text} data-testid="CommentCard.Text" />
      ) : (
        <EditCommentForm
          onCancelEditing={onCancelEditing}
          onEditComment={onEditComment}
          comment={comment}
        />
      )}
    </Card>
  )
})
