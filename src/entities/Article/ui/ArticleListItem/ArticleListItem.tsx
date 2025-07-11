import { HTMLAttributeAnchorTarget, memo, useMemo } from 'react'
import { TFunction } from 'react-i18next'
import moment from 'moment'

import { Button } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { useHover } from '@/shared/lib/hooks/useHover/useHover'
import { Card } from '@/shared/ui/Card'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { Icon } from '@/shared/ui/Icon'
import { Text, TextSize } from '@/shared/ui/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import 'moment/locale/ru'
import { HStack } from '@/shared/ui/Stack'
import { getRouteArticleDetails, getRouteProfile } from '@/shared/const/router'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'

import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts'
import { Article, ArticleTextBlock } from '../../model/types/article'

import cls from './ArticleListItem.module.scss'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
  t: TFunction<'articles', undefined>
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, t } = props
  const [isHover, bindHover] = useHover()

  const createdAt = (
    <Text
      className={cls.date}
      text={moment(article.createdAt).format('L, LT')}
    />
  )
  const types = <Text className={cls.types} text={article.type.join(', ')} />
  const imageHandler = useMemo(
    () => (view: ArticleView) => {
      const width = view === ArticleView.BIG ? '100%' : 200
      const height = view === ArticleView.BIG ? 260 : 200
      const fallback = <Skeleton width={width} height={height} />

      return (
        <AppImage
          className={cls.img}
          src={article.img}
          alt={article.title}
          fallback={fallback}
          errorFallback={fallback}
        />
      )
    },
    [article.img, article.title]
  )
  const views = <Text className={cls.views} text={String(article.views)} />

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock

    return (
      <Card
        className={classNames('', {}, [className, cls[view]])}
        data-testid="ArticleList.Item"
        {...bindHover}
      >
        <HStack className={cls.header}>
          <AppLink className={cls.user} to={getRouteProfile(article.user._id)}>
            <Avatar size={50} src={article.user.avatar} alt={t('Аватар')} />
            <Text
              className={cls.username}
              size={TextSize.L}
              text={article.user.username}
            />
          </AppLink>
          {createdAt}
        </HStack>
        <Text
          className={cls.title}
          title={article.title}
          data-testid="ArticleList.Item.Text"
        />
        {types}
        {imageHandler(ArticleView.BIG)}
        {textBlock && (
          <ArticleTextBlockComponent
            className={cls.textBlock}
            block={textBlock}
          />
        )}
        <HStack className={cls.footer}>
          <AppLink to={getRouteArticleDetails(article._id)} target={target}>
            <Button>{t('Читать далее...')}</Button>
          </AppLink>
          {views}
          <Icon className={cls.icon} Svg={EyeIcon} />
        </HStack>
      </Card>
    )
  }

  return (
    <AppLink
      className={classNames('', {}, [className, cls[view]])}
      to={getRouteArticleDetails(article._id)}
      target={target}
      data-testid="ArticleList.Item"
      {...bindHover}
    >
      <Card>
        <div className={cls.imgWrapper}>
          {imageHandler(ArticleView.SMALL)}
          {isHover && createdAt}
        </div>
        <HStack className={cls.infoWrapper}>
          {types}
          {views}
          <Icon className={cls.icon} Svg={EyeIcon} />
        </HStack>
        <Text
          className={cls.title}
          text={article.title}
          data-testid="ArticleList.Item.Text"
        />
      </Card>
    </AppLink>
  )
})
