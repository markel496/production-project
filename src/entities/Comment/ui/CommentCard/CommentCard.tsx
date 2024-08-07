/* eslint-disable indent */
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { routePath } from 'shared/config/routeConfig/routeConfig'
import { DeleteComment } from 'features/deleteComment'
import { getUserAuthData } from 'entities/User'
import { useSelector } from 'react-redux'
import {
  EditComment,
  EditCommentArgs,
  EditCommentBtn
} from 'features/editComment'

import moment from 'moment'
import 'moment/locale/ru'
import { HStack, VStack } from 'shared/ui/Stack'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
  onDeleteArticleComment?: (_id: string) => void
  onEditArticleComment?: (commentData: EditCommentArgs) => void
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { t, i18n } = useTranslation('comments')
  const {
    className,
    comment,
    isLoading,
    onDeleteArticleComment,
    onEditArticleComment
  } = props

  const [isEditing, setIsEditing] = useState(false)

  const authData = useSelector(getUserAuthData)
  const canEdit = comment?.user._id === authData?._id

  const onDeleteComment = useCallback(() => {
    if (!comment) {
      return
    }
    onDeleteArticleComment?.(comment._id)
  }, [comment, onDeleteArticleComment])

  const onEditComment = useCallback(
    (commentData: EditCommentArgs) => {
      onEditArticleComment?.(commentData)
    },
    [onEditArticleComment]
  )

  const onChangeComment = useCallback(() => {
    setIsEditing(true)
  }, [])

  const onCancelEditing = useCallback(() => {
    setIsEditing(false)
  }, [])

  if (isLoading) {
    return (
      <div
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
        <HStack className={cls.header} justify="start" gap="10">
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width="30%" height={20} />
        </HStack>
        <Skeleton className={cls.createdAtSkeleton} width={120} height={15} />
        <Skeleton height={40} />
      </div>
    )
  }

  if (!comment) return null

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <HStack className={cls.header} justify="between">
        <VStack>
          <AppLink
            className={cls.profile}
            to={`${routePath.profile}${comment.user._id}`}
          >
            {comment.user.avatar && (
              <Avatar
                className={cls.avatar}
                alt="Аватар"
                size={30}
                src={comment.user.avatar}
              />
            )}
            <Text title={comment.user.username} />
          </AppLink>

          <Text
            size={TextSize.S}
            text={
              __PROJECT__ !== 'storybook'
                ? comment.createdAt === comment.updatedAt
                  ? moment(comment.createdAt)
                      .locale(i18n.language)
                      .format(i18n.language === 'ru' ? 'll в LT' : 'LLL')
                  : moment(comment.createdAt)
                      .locale(i18n.language)
                      .format(i18n.language === 'ru' ? 'll в LT' : 'LLL') +
                    t(' (ред.)')
                : comment.createdAt
            }
          />
        </VStack>
        {canEdit && (
          <HStack gap="10">
            {!isEditing && <EditCommentBtn onChangeComment={onChangeComment} />}

            <DeleteComment onDeleteComment={onDeleteComment} />
          </HStack>
        )}
      </HStack>
      {!isEditing ? (
        <Text text={comment.text} />
      ) : (
        <EditComment
          onCancelEditing={onCancelEditing}
          onEditComment={onEditComment}
          comment={comment}
        />
      )}
    </div>
  )
})
