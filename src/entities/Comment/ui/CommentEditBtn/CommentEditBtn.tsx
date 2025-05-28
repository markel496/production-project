import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import EditIcon from '@/shared/assets/icons/edit.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'

import cls from './CommentEditBtn.module.scss'

interface CommentEditBtnProps {
  className?: string
  onChangeComment?: () => void
}

export const CommentEditBtn = memo((props: CommentEditBtnProps) => {
  const { className, onChangeComment } = props

  return (
    <Button
      className={classNames(cls.CommentEditBtn, {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={onChangeComment}
      data-testid="CommentCard.EditBtn"
    >
      <Icon Svg={EditIcon} className={cls.icon} />
    </Button>
  )
})
