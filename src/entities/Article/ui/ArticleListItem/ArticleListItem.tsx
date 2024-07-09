import { HTMLAttributeAnchorTarget, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView
} from '../../model/types/article'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { Card } from 'shared/ui/Card/Card'
import { useHover } from 'shared/lib/hooks/useHover/useHover'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { TFunction } from 'react-i18next'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { Button } from 'shared/ui/Button/Button'
import { routePath } from 'shared/config/routeConfig/routeConfig'
import { AppLink } from 'shared/ui/AppLink/AppLink'

import moment from 'moment'
import 'moment/locale/ru'
import { HStack } from 'shared/ui/Stack'

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
  const image = (
    <img className={cls.img} src={article.img} alt={article.title} />
  )
  const views = <Text className={cls.views} text={String(article.views)} />

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock

    return (
      <Card
        {...bindHover}
        className={classNames('', {}, [className, cls[view]])}
      >
        <HStack className={cls.header}>
          <AppLink
            className={cls.user}
            to={routePath.profile + article.user._id}
          >
            {article.user.avatar && (
              <Avatar
                className={cls.avatar}
                size={50}
                src={article.user.avatar}
                alt={t('Аватар')}
              />
            )}
            <Text size={TextSize.L} text={article.user.username} />
          </AppLink>
          {createdAt}
        </HStack>
        <Text className={cls.title} title={article.title} />
        {types}
        {image}
        {textBlock && (
          <ArticleTextBlockComponent
            className={cls.textBlock}
            block={textBlock}
          />
        )}
        <HStack className={cls.footer}>
          <AppLink to={routePath.article_details + article._id} target={target}>
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
      to={routePath.article_details + article._id}
      target={target}
      {...bindHover}
    >
      <Card>
        <div className={cls.imgWrapper}>
          {image}
          {isHover && createdAt}
        </div>
        <HStack className={cls.infoWrapper}>
          {types}
          {views}
          <Icon className={cls.icon} Svg={EyeIcon} />
        </HStack>
        <Text className={cls.title} text={article.title} />
      </Card>
    </AppLink>
  )
})
