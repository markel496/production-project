import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import RemoveIcon from '@/shared/assets/icons/trash.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'

import cls from './CommentDeleteBtn.module.scss'

interface CommentDeleteBtnProps {
  className?: string
  onDeleteComment?: () => void
}

export const CommentDeleteBtn = memo((props: CommentDeleteBtnProps) => {
  const { className, onDeleteComment } = props

  return (
    <Button
      className={classNames(cls.CommentDeleteBtn, {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={onDeleteComment}
    >
      <Icon Svg={RemoveIcon} className={cls.icon} />
    </Button>
  )
})
