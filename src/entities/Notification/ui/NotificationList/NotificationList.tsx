import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotificationList.module.scss'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { useNotifications } from '../../api/notificationsApi'
import { NotificationCard } from '../NotificationCard/NotificationCard'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text'
import { VStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton'

interface NotificationListProps {
  className?: string
  onCloseDrawer?: () => void
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className, onCloseDrawer } = props
  const { t } = useTranslation()
  const userId = useSelector(getUserId)

  const {
    data: notifications,
    isLoading,
    isError
  } = useNotifications(userId, {
    pollingInterval: 10000 // Новый запрос каждые 10сек
  })

  if (isLoading) {
    return (
      <VStack className={className} gap="10">
        <Skeleton height={70} border="10px" />
        <Skeleton height={70} border="10px" />
        <Skeleton height={70} border="10px" />
      </VStack>
    )
  }

  if (isError) {
    return (
      <div className={classNames(cls.error, {}, [className])}>
        <Text
          text={t('Произошла ошибка при загрузке уведомлений')}
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
        />
      </div>
    )
  }

  return (
    <VStack
      className={classNames(cls.NotificationList, {}, [className])}
      gap="10"
    >
      {notifications?.length ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            onCloseDrawer={onCloseDrawer}
          />
        ))
      ) : (
        <Text
          className={cls.noDataText}
          text={t('Нет новых уведомлений')}
          align={TextAlign.CENTER}
        />
      )}
    </VStack>
  )
})
