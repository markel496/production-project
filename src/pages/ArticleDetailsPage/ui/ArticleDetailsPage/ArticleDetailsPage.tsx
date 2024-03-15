import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ArticleDetails, ArticleList, ArticleView } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading
} from '../../model/selectors/comments'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { AddNewComment, AddNewCommentArgs } from 'features/addNewComment'
import { addNewCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { deleteArticleComment } from '../../model/services/deleteArticleComment/deleteArticleComment'
import { EditCommentArgs } from 'features/editComment'
import { editArticleComment } from '../../model/services/editArticleComment/editArticleComment'
import { Page } from 'widgets/Page'
import { getArticleRecommendations } from '../../model/slices/articleDetailsRecommendationsSlice'
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations'
import { fetchRecommendedArticles } from '../../model/services/fetchRecommendedArticles/fetchRecommendedArticles'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

const initialReducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
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

  const recommmendations = useSelector(getArticleRecommendations.selectAll)
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading
  )
  // const recommendationsError = useSelector(getArticleRecommendationsError)

  const dispatch = useAppDispatch()

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
    dispatch(fetchRecommendedArticles())
  })

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader id={id} />
        <ArticleDetails className={cls.articleDetails} id={id} />
        <Text
          className={cls.recommendedTitle}
          title={t('Рекомендуем')}
          size={TextSize.L}
        />
        <ArticleList
          className={cls.recommended}
          t={t}
          articles={recommmendations}
          view={ArticleView.SMALL}
          isLoading={recommendationsIsLoading}
          target="_blank"
        />
        <Text
          className={cls.commentsTitle}
          title={t('Комментарии')}
          size={TextSize.L}
        />
        <AddNewComment
          className={cls.addNewComment}
          onSendComment={onSendComment}
        />
        <CommentList
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
