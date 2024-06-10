import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { Comment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { EditCommentArgs } from 'features/editComment'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
  error?: string
  onDeleteArticleComment?: (_id: string) => void
  onEditArticleComment?: (commentData: EditCommentArgs) => void
}

export const CommentList = memo((props: CommentListProps) => {
  const { t } = useTranslation('comments')
  const {
    className,
    comments,
    isLoading,
    error,
    onDeleteArticleComment,
    onEditArticleComment
  } = props

  if (error) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <Text text={error} theme={TextTheme.ERROR} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className])}>
        <CommentCard className={cls.comment} isLoading />
        <CommentCard className={cls.comment} isLoading />
      </div>
    )
  }

  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            className={cls.comment}
            key={comment._id}
            comment={comment}
            onDeleteArticleComment={onDeleteArticleComment}
            onEditArticleComment={onEditArticleComment}
          />
        ))
      ) : (
        <Text text={t('Комментариев пока нет...')} />
      )}
    </div>
  )
})
