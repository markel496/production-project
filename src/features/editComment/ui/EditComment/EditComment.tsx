import { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './EditComment.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { Button, ButtonSize } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { EditCommentArgs } from '../../model/types/editComment'
import { Comment } from 'entities/Comment'

interface EditCommentProps {
  className?: string
  onCancelEditing?: () => void
  onEditComment: (data: EditCommentArgs) => void
  comment: Comment
}

export const EditComment = memo((props: EditCommentProps) => {
  const { t } = useTranslation('comments')
  const { className, onCancelEditing, onEditComment, comment } = props

  const { _id, text: commentText } = comment

  const [text, setText] = useState(commentText)

  const onCommentTextChange = useCallback((value: string) => {
    setText(value)
  }, [])

  const disabledChangeBtn = useCallback(() => {
    if (!text) return true
    return text === commentText
  }, [commentText, text])

  const onEditHandler = useCallback(() => {
    onEditComment({ _id, text })
  }, [_id, onEditComment, text])

  return (
    <div className={classNames(cls.EditComment, {}, [className])}>
      <Input
        className={cls.input}
        value={text}
        onChange={onCommentTextChange}
        placeholder=" "
        autoFocus
      />
      <div className={cls.buttons}>
        <Button
          className={cls.changeBtn}
          size={ButtonSize.S}
          disabled={disabledChangeBtn()}
          onClick={onEditHandler}
        >
          {t('Изменить')}
        </Button>
        <Button size={ButtonSize.S} onClick={onCancelEditing}>
          {t('Отмена')}
        </Button>
      </div>
    </div>
  )
})
