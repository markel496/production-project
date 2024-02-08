import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './EditCommentBtn.module.scss'
import EditIcon from 'shared/assets/icons/edit.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface EditCommentBtnProps {
  className?: string
  onChangeComment?: () => void
}

export const EditCommentBtn = memo((props: EditCommentBtnProps) => {
  const { className, onChangeComment } = props

  return (
    <Button
      className={classNames(cls.EditCommentBtn, {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={onChangeComment}
    >
      <EditIcon />
    </Button>
  )
})
