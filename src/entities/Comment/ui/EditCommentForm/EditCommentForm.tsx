import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import { Input } from '@/shared/ui/Input'
import { Button, ButtonSize } from '@/shared/ui/Button'

import { HStack } from '@/shared/ui/Stack'

import { Comment, EditCommentArgs } from '../../model/types/comment'

import cls from './EditCommentForm.module.scss'

interface EditCommentFormProps {
  className?: string
  onCancelEditing?: () => void
  onEditComment?: (data: EditCommentArgs) => void
  comment: Comment
}

export const EditCommentForm = memo((props: EditCommentFormProps) => {
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
    onEditComment?.({ _id, text })
  }, [_id, onEditComment, text])

  return (
    <div
      className={classNames(cls.EditCommentForm, {}, [className])}
      data-testid="EditCommentForm"
    >
      <Input
        className={cls.input}
        value={text}
        onChange={onCommentTextChange}
        placeholder=" "
        autoFocus
        data-testid="EditCommentForm.Input"
      />
      <HStack gap="5">
        <Button
          size={ButtonSize.S}
          disabled={disabledChangeBtn()}
          onClick={onEditHandler}
          data-testid="EditCommentForm.ChangeBtn"
        >
          {t('Изменить')}
        </Button>
        <Button
          size={ButtonSize.S}
          onClick={onCancelEditing}
          data-testid="EditCommentForm.CancelBtn"
        >
          {t('Отмена')}
        </Button>
      </HStack>
    </div>
  )
})
