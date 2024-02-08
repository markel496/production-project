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
import { AddNewCommentArgs } from '../../model/types/addNewComment'

import moment from 'moment'
import 'moment/locale/ru'

const initialReducers: ReducersList = {
  addNewComment: addNewCommentReducer
}

export interface AddNewCommentProps {
  className?: string
  onSendComment: (commentData: AddNewCommentArgs) => void
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
    const createdAt = moment().format('L в LT')
    onSendComment({ text, createdAt })
    onCommentTextChange('')
  }, [dispatch, text, onSendComment, onCommentTextChange])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div
        className={classNames(cls.AddNewComment, { [cls.error]: error }, [
          className
        ])}
      >
        <Input
          className={cls.input}
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onCommentTextChange}
          clearError={clearError}
        />
        <Button onClick={onSendHandler}>{t('Отправить')}</Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default AddNewComment
