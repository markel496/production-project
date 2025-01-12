/* eslint-disable indent */
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AvatarDropdown.module.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Dropdown } from '@/shared/ui/Popups'
import { User, UserRole, userActions } from '@/entities/User'
import { routePath } from '@/shared/config/routeConfig/routeConfig'
import { Avatar } from '@/shared/ui/Avatar/Avatar'

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
      className={classNames('', {}, [className])}
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('Админка'),
                href: routePath.admin_panel
              }
            ]
          : []),
        {
          content: t('Профиль'),
          href: routePath.profile + authData._id
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
