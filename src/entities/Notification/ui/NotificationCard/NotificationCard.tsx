import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotificationCard.module.scss'
import { Card, CardTheme } from 'shared/ui/Card/Card'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { HStack } from 'shared/ui/Stack'
import { Notification } from '../../model/types/notification'
import { AppLink } from 'shared/ui/AppLink/AppLink'

import moment from 'moment'
import 'moment/locale/ru'

interface NotificationCardProps {
  className?: string
  notification?: Notification
}

export const NotificationCard = (props: NotificationCardProps) => {
  const { className, notification } = props

  if (!notification) return null

  const { title, description, href, createdAt } = notification

  const content = (
    <>
      <HStack justify="between">
        <Text title={title} size={TextSize.M} />
        <Text text={moment(createdAt).format('L, LT')} size={TextSize.S} />
      </HStack>
      {description && <Text className={cls.descr} text={description} />}
    </>
  )

  if (href) {
    return (
      <AppLink
        className={classNames(cls.NotificationCard, {}, [className])}
        to={href}
      >
        <Card theme={CardTheme.OUTLINE}>{content}</Card>
      </AppLink>
    )
  }
  return (
    <Card
      className={classNames(cls.NotificationCard, {}, [className])}
      theme={CardTheme.OUTLINE}
    >
      {content}
    </Card>
  )
}
