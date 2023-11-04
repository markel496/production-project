import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SidebarItem.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'
import { SidebarItemType } from '../../model/items'
import { memo } from 'react'

interface SideBarItemProps {
  item?: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo((props: SideBarItemProps) => {
  const { item, collapsed } = props
  const { t } = useTranslation()

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
