import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import { Popover } from 'shared/ui/Popups'
import { Icon } from 'shared/ui/Icon/Icon'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from 'entities/Notification'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props

  return (
    <Popover
      className={classNames('', {}, [className])}
      trigger={<Icon className={cls.icon} Svg={NotificationIcon} inverted />}
      position="bottom left"
      // openedPopover={cls.openedPopover}
    >
      <NotificationList className={cls.panel} />
    </Popover>
  )
})
