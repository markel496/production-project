import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import cls from './ArticleComments.module.scss'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { AddNewCommentForm, CommentList } from 'entities/Comment'
import {
  articleCommentsReducer,
  getArticleComments
} from '../model/slices/articleCommentsSlice'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading
} from '../model/selectors/articleComments'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addNewCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle'
import { deleteArticleComment } from '../model/services/deleteArticleComment/deleteArticleComment'
import { editArticleComment } from '../model/services/editArticleComment/editArticleComment'
import { EditCommentArgs } from 'entities/Comment'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'

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
    (comment: string) => {
      dispatch(addNewCommentForArticle(comment))
    },
    [dispatch]
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
