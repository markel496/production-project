/* eslint-disable indent */
import cls from './ArticleDetails.module.scss'
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { memo, useCallback } from 'react'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/articleDetails'
import { useSelector } from 'react-redux'
import { TextTheme, Text, TextAlign, TextSize } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Avatar } from '@/shared/ui/Avatar'
import { useTranslation } from 'react-i18next'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import { Icon } from '@/shared/ui/Icon'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'

import moment from 'moment'
import 'moment/locale/ru'
import { HStack, VStack } from '@/shared/ui/Stack'
import { ArticleBlockType } from '../../model/consts/articleConsts'
import { ArticleBlock } from '../../model/types/article'

const initialReducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

interface ArticleDetailsProps {
  className?: string
  id?: string
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { t, i18n } = useTranslation('articles')
  const { className, id } = props
  const dispatch = useAppDispatch()

  const article = useSelector(getArticleDetailsData)
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block._id} block={block} />

      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block._id} block={block} />

      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block._id} block={block} />

      default:
        return null
    }
  }, [])

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
      <Text theme={TextTheme.ERROR} title={t(error)} align={TextAlign.CENTER} />
    )
  } else {
    content = (
      <>
        <HStack>
          <Avatar
            className={cls.avatar}
            src={article?.img}
            alt={t('Аватар')}
            size={200}
          />
        </HStack>
        <Text
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
          className={cls.title}
        />
        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </HStack>
        <HStack gap="8">
          <Icon Svg={CalendarIcon} className={cls.icon} />
          <Text
            text={
              __PROJECT__ !== 'storybook'
                ? moment(article?.createdAt)
                    .locale(i18n?.language)
                    .format(i18n?.language === 'ru' ? 'll в LT' : 'LLL')
                : article?.createdAt
            }
          />
        </HStack>
        <VStack className={cls.blocks} gap="20">
          {article?.blocks.map(renderBlock)}
        </VStack>
      </>
    )
  }

  useInitialEffect(() => {
    dispatch(fetchArticleById(id))
  })

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={className}>{content}</div>
    </DynamicModuleLoader>
  )
})
