import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { LoginModal } from '@/features/AuthByUsername'
import { getUserAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/Text'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { NotificationButton } from '@/features/notificationButton'
import { AvatarDropdown } from '@/features/avatarDropdown'
import { getRouteArticleCreate } from '@/shared/const/router'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isAuthModal, setisAuthModal] = useState(false)
  const { t } = useTranslation()

  const authData = useSelector(getUserAuthData)

  const onShowModal = useCallback(() => {
    setisAuthModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setisAuthModal(false)
  }, [])

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title="My app"
          theme={TextTheme.INVERTED}
        />
        <AppLink theme={AppLinkTheme.INVERTED} to={getRouteArticleCreate()}>
          {t('Создать статью')}
        </AppLink>

        <HStack className={cls.rightFlexWrapper} gap="20">
          <NotificationButton />
          <AvatarDropdown authData={authData} />
        </HStack>
      </header>
    )
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <div className={classNames(cls.links)}>
        <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
          {t('Войти')}
        </Button>
        {isAuthModal && (
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        )}
      </div>
    </header>
  )
})
