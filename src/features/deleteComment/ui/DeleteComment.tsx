import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './DeleteComment.module.scss'
import RemoveIcon from 'shared/assets/icons/trash.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface DeleteCommentProps {
  className?: string
  onDeleteComment: () => void
}

export const DeleteComment = memo((props: DeleteCommentProps) => {
  const { className, onDeleteComment } = props

  const onDeleteHandler = useCallback(() => {
    onDeleteComment()
  }, [onDeleteComment])

  return (
    <Button
      className={classNames(cls.DeleteComment, {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={onDeleteHandler}
    >
      <RemoveIcon />
    </Button>
  )
})
