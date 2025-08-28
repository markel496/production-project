import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Text, TextSize } from '@/shared/ui/Text'
import {
  AddNewCommentForm,
  CommentList,
  EditCommentArgs
} from '@/entities/Comment'

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'

import {
  articleCommentsReducer,
  getArticleComments
} from '../model/slices/articleCommentsSlice'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading
} from '../model/selectors/articleComments'
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'

import { addNewCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle'
import { deleteArticleComment } from '../model/services/deleteArticleComment/deleteArticleComment'
import { editArticleComment } from '../model/services/editArticleComment/editArticleComment'

import cls from './ArticleComments.module.scss'

const initialReducers: ReducersList = {
  articleComments: articleCommentsReducer
}

interface ArticleCommentsProps {
  id?: string
}

export const ArticleComments = memo((props: ArticleCommentsProps) => {
  const { id } = props
  const { t } = useTranslation()

  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const commentsError = useSelector(getArticleCommentsError)

  const dispatch = useAppDispatch()

  const onSendComment = useCallback(
    async (comment: string) => {
      await dispatch(addNewCommentForArticle({ comment, id }))
      dispatch(fetchCommentsByArticleId(id))
    },
    [dispatch, id]
  )

  const onDeleteComment = useCallback(
    (commentId: string) => {
      dispatch(deleteArticleComment(commentId))
    },
    [dispatch]
  )

  const onEditComment = useCallback(
    (commentData: EditCommentArgs) => {
      dispatch(editArticleComment(commentData))
    },
    [dispatch]
  )

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Text
        className={cls.commentsTitle}
        title={t('Комментарии')}
        size={TextSize.L}
      />
      <AddNewCommentForm
        className={cls.addNewComment}
        onSendComment={onSendComment}
      />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
        error={commentsError}
        onDeleteComment={onDeleteComment}
        onEditComment={onEditComment}
      />
    </DynamicModuleLoader>
  )
})
