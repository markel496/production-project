import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './EditCommentBtn.module.scss'
import EditIcon from 'shared/assets/icons/edit.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'

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
      <Icon Svg={EditIcon} className={cls.icon} />
    </Button>
  )
})
