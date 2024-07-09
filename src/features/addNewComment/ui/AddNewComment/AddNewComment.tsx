import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddNewComment.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  getNewCommentError,
  getNewCommentText
} from '../../model/selectors/addNewCommentSelectors'
import { Button } from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  addNewCommentActions,
  addNewCommentReducer
} from '../../model/slice/addNewCommentSlice'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from 'shared/ui/Stack'

const initialReducers: ReducersList = {
  addNewComment: addNewCommentReducer
}

export interface AddNewCommentProps {
  className?: string
  onSendComment: (comment: string) => void
}

const AddNewComment = memo((props: AddNewCommentProps) => {
  const { t } = useTranslation('comments')
  const { className, onSendComment } = props

  const text = useSelector(getNewCommentText)
  const error = useSelector(getNewCommentError)
  const dispatch = useAppDispatch()

  const clearError = useCallback(() => {
    dispatch(addNewCommentActions.setError(false))
  }, [dispatch])

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addNewCommentActions.setText(value))
    },
    [dispatch]
  )

  const onSendHandler = useCallback(() => {
    if (!text?.trim()) {
      dispatch(addNewCommentActions.setError(true))
      onCommentTextChange('')
      return
    }
    onSendComment(text)
    onCommentTextChange('')
  }, [dispatch, text, onSendComment, onCommentTextChange])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <HStack
        className={classNames(cls.AddNewComment, { [cls.error]: error }, [
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
    </DynamicModuleLoader>
  )
})

export default AddNewComment
