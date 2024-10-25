import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Comment, EditCommentArgs } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { VStack } from 'shared/ui/Stack'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
  error?: string
  onDeleteComment?: (_id: string) => void
  onEditComment?: (commentData: EditCommentArgs) => void
}

export const CommentList = memo((props: CommentListProps) => {
  const { t } = useTranslation('comments')
  const {
    className,
    comments,
    isLoading,
    error,
    onDeleteComment,
    onEditComment
  } = props

  const onDeleteCommentHandler = useCallback(
    (commentId: string) => {
      onDeleteComment?.(commentId)
    },
    [onDeleteComment]
  )

  if (error) {
    return (
      <div className={classNames('', {}, [className])}>
        <Text text={error} theme={TextTheme.ERROR} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <VStack className={classNames('', {}, [className])} gap="10">
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    )
  }

  return (
    <VStack className={classNames('', {}, [className])} gap="10">
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            onDeleteComment={() => onDeleteCommentHandler(comment._id)}
            onEditComment={onEditComment}
          />
        ))
      ) : (
        <Text text={t('Комментариев пока нет...')} />
      )}
    </VStack>
  )
})
