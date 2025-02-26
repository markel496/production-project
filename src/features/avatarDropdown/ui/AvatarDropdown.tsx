/* eslint-disable indent */
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Dropdown } from '@/shared/ui/Popups'
import { User, UserRole, userActions } from '@/entities/User'
import { Avatar } from '@/shared/ui/Avatar'
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router'

import cls from './AvatarDropdown.module.scss'

interface AvatarDropdownProps {
  className?: string
  authData: User
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className, authData } = props
  const { t } = useTranslation()

  const isAdmin = authData.roles?.includes(UserRole.ADMIN)
  const isManager = authData.roles?.includes(UserRole.MANAGER)

  const isAdminPanelAvailable = isAdmin || isManager

  const dispatch = useAppDispatch()

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  return (
    <Dropdown
      className={className}
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('Админка'),
                href: getRouteAdminPanel()
              }
            ]
          : []),
        {
          content: t('Профиль'),
          href: getRouteProfile(authData._id)
        },
        { content: t('Выйти'), onClick: onLogout }
      ]}
      trigger={
        <Avatar
          className={authData.avatar ?? cls.noAvatar}
          alt="Аватар"
          size={30}
          src={authData.avatar}
        />
      }
      position="bottom left"
    />
  )
})
