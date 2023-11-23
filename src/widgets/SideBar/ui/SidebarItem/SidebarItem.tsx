import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SidebarItem.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'
import { SidebarItemType } from '../../model/items'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'

interface SideBarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo((props: SideBarItemProps) => {
  const { item, collapsed } = props
  const { t } = useTranslation()

  const isAuth = useSelector(getUserAuthData)

  if (item.authOnly && !isAuth) return null

  return (
    <AppLink
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      theme={AppLinkTheme.INVERTED}
      to={item.path}
    >
      <div>
        <item.Icon className={cls.icon} />
      </div>
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  )
})
