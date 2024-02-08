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

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
  onDeleteArticleComment?: (id: string) => void
  onEditArticleComment?: (commentData: EditCommentArgs) => void
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { t } = useTranslation('comments')
  const {
    className,
    comment,
    isLoading,
    onDeleteArticleComment,
    onEditArticleComment
  } = props

  const [isEditing, setIsEditing] = useState(false)

  const authData = useSelector(getUserAuthData)
  const canEdit = comment?.user.id === authData?.id

  const onDeleteComment = useCallback(() => {
    if (!comment) {
      return
    }
    onDeleteArticleComment?.(comment.id)
  }, [comment, onDeleteArticleComment])

  const onEditComment = useCallback(
    (commentData: EditCommentArgs) => {
      if (!comment) {
        return
      }
      onEditArticleComment?.(commentData)
    },
    [comment, onEditArticleComment]
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
        <div className={cls.header}>
          <Skeleton
            className={cls.avatar}
            width={30}
            height={30}
            border="50%"
          />
          <Skeleton width="30%" height={20} />
        </div>
        <Skeleton className={cls.createdAt} width={120} height={15} />
        <Skeleton height={40} />
      </div>
    )
  }

  if (!comment) return null

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        <div className={cls.container}>
          <AppLink
            className={cls.profile}
            to={`${routePath.profile}${comment.user.id}`}
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
              !comment.edited
                ? comment.createdAt
                : comment.createdAt + t(' (ред.)')
            }
          />
        </div>
        {canEdit && (
          <div className={cls.buttonsContainer}>
            {!isEditing && (
              <EditCommentBtn
                className={cls.editBtn}
                onChangeComment={onChangeComment}
              />
            )}

            <DeleteComment onDeleteComment={onDeleteComment} />
          </div>
        )}
      </div>
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
