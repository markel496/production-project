import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import { Popover } from 'shared/ui/Popups'
import { Icon } from 'shared/ui/Icon/Icon'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from 'entities/Notification'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Drawer } from 'shared/ui/Drawer/Drawer'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props

  const [isDrawer, setIsDrawer] = useState(false)

  const onShowDrawer = useCallback(() => {
    setIsDrawer(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsDrawer(false)
  }, [])

  const trigger = <Icon className={cls.icon} Svg={NotificationIcon} inverted />

  return (
    <>
      <BrowserView>
        <Popover
          className={classNames('', {}, [className])}
          trigger={trigger}
          position="bottom left"
        >
          <NotificationList className={cls.panel} />
        </Popover>
      </BrowserView>
      <MobileView>
        <Button theme={ButtonTheme.CLEAR} onClick={onShowDrawer}>
          {trigger}
        </Button>
        {isDrawer && (
          <Drawer isOpen={isDrawer} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        )}
      </MobileView>
    </>
  )
})
