import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { Comment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'
import { Text } from 'shared/ui/Text/Text'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
  const { t } = useTranslation('comments')
  const { className, comments, isLoading } = props

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {isLoading ? (
        [...new Array(2)].map((_, index) => (
          <CommentCard
            className={cls.comment}
            key={index}
            isLoading={isLoading}
          />
        ))
      ) : comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            className={cls.comment}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('Комментариев пока нет...')} />
      )}
    </div>
  )
})
