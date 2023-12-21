import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { memo, useCallback, useEffect } from 'react'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails'
import { useSelector } from 'react-redux'
import { TextTheme, Text, TextAlign, TextSize } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { useTranslation } from 'react-i18next'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import {
  ArticleBlock,
  ArticleBlockType
} from 'entities/Article/model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

const initialReducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

interface ArticleDetailsProps {
  className?: string
  id: string
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { t } = useTranslation('articles')
  const { className, id } = props
  const dispatch = useAppDispatch()

  const article = useSelector(getArticleDetailsData)
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            className={cls.block}
            key={block.id}
            block={block}
          />
        )

      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            className={cls.block}
            key={block.id}
            block={block}
          />
        )

      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            className={cls.block}
            key={block.id}
            block={block}
          />
        )

      default:
        return null
    }
  }, [])

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id))
    }
  }, [dispatch, id])

  let content

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    )
  } else if (error) {
    content = (
      <Text
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке статьи')}
        align={TextAlign.CENTER}
      />
    )
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar
            className={cls.avatar}
            src={article?.img}
            alt={t('Аватар')}
            size={200}
          />
        </div>
        <Text
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
          className={cls.title}
        />
        <div className={cls.articleInfo}>
          <Icon Svg={EyeIcon} className={cls.icon} />
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} className={cls.icon} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})
