import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Input } from '@/shared/ui/Input'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'

import cls from './AddNewCommentForm.module.scss'

export interface AddNewCommentFormProps {
  className?: string
  onSendComment: (comment: string) => void
}

const AddNewCommentForm = memo((props: AddNewCommentFormProps) => {
  const { t } = useTranslation('comments')
  const { className, onSendComment } = props

  const [text, setText] = useState('')
  const [error, setError] = useState(false)

  const clearError = useCallback(() => {
    setError(false)
  }, [])

  const onCommentTextChange = useCallback((value: string) => {
    setText(value)
  }, [])

  const onSendHandler = useCallback(() => {
    if (!text.trim()) {
      setError(true)
      onCommentTextChange('')
      return
    }
    onSendComment(text)
    onCommentTextChange('')
  }, [text, onSendComment, onCommentTextChange])

  return (
    <HStack
      className={classNames(cls.AddNewCommentForm, { [cls.error]: error }, [
        className
      ])}
      justify="between"
      gap="20"
    >
      <Input
        className={cls.input}
        placeholder={t('Введите текст комментария')}
        value={text}
        onChange={onCommentTextChange}
        clearError={clearError}
      />
      <Button onClick={onSendHandler}>{t('Отправить')}</Button>
    </HStack>
  )
})

export default AddNewCommentForm
