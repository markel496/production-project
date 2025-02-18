import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Text, TextTheme } from '@/shared/ui/Text'

import { VStack } from '@/shared/ui/Stack'

import { Comment, EditCommentArgs } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
  error?: string
  onDeleteComment?: (id: string) => void
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

  if (isLoading) {
    return (
      <VStack className={className} gap="10">
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    )
  }

  if (error) {
    return (
      <div className={className}>
        <Text text={error} theme={TextTheme.ERROR} />
      </div>
    )
  }

  return (
    <VStack className={className} gap="10">
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            onDeleteComment={() => onDeleteComment?.(comment._id)}
            onEditComment={onEditComment}
          />
        ))
      ) : (
        <Text text={t('Комментариев пока нет...')} />
      )}
    </VStack>
  )
})
