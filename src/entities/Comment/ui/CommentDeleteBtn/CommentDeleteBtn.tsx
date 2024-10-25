import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentDeleteBtn.module.scss'
import RemoveIcon from 'shared/assets/icons/trash.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'

interface CommentDeleteBtnProps {
  className?: string
  onDeleteComment?: (_id: string) => void
}

export const CommentDeleteBtn = memo((props: CommentDeleteBtnProps) => {
  const { className, onDeleteComment } = props

  const onDeleteHandler = useCallback(
    (id) => {
      onDeleteComment?.(id)
    },
    [onDeleteComment]
  )

  return (
    <Button
      className={classNames(cls.CommentDeleteBtn, {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={onDeleteHandler}
    >
      <Icon Svg={RemoveIcon} className={cls.icon} />
    </Button>
  )
})
