import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import cls from './NotificationButton.module.scss'
import { Popover } from '@/shared/ui/Popups'
import { Icon } from '@/shared/ui/Icon/Icon'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { NotificationList } from '@/entities/Notification'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Drawer } from '@/shared/ui/Drawer/Drawer'

interface NotificationButtonProps {
  className?: string
  size?: number
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className, size } = props

  const [isDrawer, setIsDrawer] = useState(false)

  const onShowDrawer = useCallback(() => {
    setIsDrawer(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsDrawer(false)
  }, [])

  const trigger = (
    <Icon
      className={cls.icon}
      Svg={NotificationIcon}
      width={size}
      height={size}
      inverted
    />
  )

  return (
    <>
      <BrowserView>
        <Popover className={className} trigger={trigger} position="bottom left">
          <NotificationList className={cls.panel} />
        </Popover>
      </BrowserView>
      <MobileView>
        <Button theme={ButtonTheme.CLEAR} onClick={onShowDrawer}>
          {trigger}
        </Button>
        {isDrawer && (
          <Drawer isOpen={isDrawer} onClose={onCloseDrawer}>
            <NotificationList onCloseDrawer={onCloseDrawer} />
          </Drawer>
        )}
      </MobileView>
    </>
  )
})
