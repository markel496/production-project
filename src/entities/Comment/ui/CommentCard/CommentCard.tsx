import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width="30%" height={20} className={cls.username} />
        </div>
        <Skeleton height={40} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment?.user.avatar && (
          <Avatar alt="Аватар" size={30} src={comment.user.avatar} />
        )}
        <Text title={comment?.user.username} className={cls.username} />
      </div>
      <Text text={comment?.text} />
    </div>
  )
})
