import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ArticleDetails } from 'entities/Article'
import { useNavigate, useParams } from 'react-router-dom'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import {
  articleDetailsCommentsReducer,
  getArticleComments
} from '../model/slices/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading
} from '../model/selectors/comments'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { AddNewComment, AddNewCommentArgs } from 'features/addNewComment'
import { addNewCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle'
import { deleteArticleComment } from '../model/services/deleteArticleComment/deleteArticleComment'
import { EditCommentArgs } from 'features/editComment'
import { editArticleComment } from '../model/services/editArticleComment/editArticleComment'
import { Button } from 'shared/ui/Button/Button'
import { routePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'widgets/Page'

const initialReducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { t } = useTranslation('articles')
  const { className } = props
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const commentsError = useSelector(getArticleCommentsError)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(routePath.articles)
  }, [navigate])

  const onSendComment = useCallback(
    (commentData: AddNewCommentArgs) => {
      dispatch(addNewCommentForArticle(commentData))
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

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Text theme={TextTheme.ERROR} text={t('Статья не найдена')} />
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button className={cls.backBtn} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={id} />
        <Text title={t('Комментарии')} className={cls.commentsTitle} />
        <AddNewComment
          className={cls.addNewComment}
          onSendComment={onSendComment}
        />
        <CommentList
          className={cls.commentList}
          isLoading={commentsIsLoading}
          comments={comments}
          error={commentsError}
          onDeleteArticleComment={onDeleteComment}
          onEditArticleComment={onEditComment}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
