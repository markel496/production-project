import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { routePath } from 'shared/config/routeConfig/routeConfig'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import MainPageIcon from 'shared/assets/icons/main-20-20.svg'
import AboutPageIcon from 'shared/assets/icons/about-20-20.svg'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }
  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <div className={classNames(cls.items)}>
        <AppLink
          className={classNames(cls.item)}
          theme={AppLinkTheme.INVERTED}
          to={routePath.main}
        >
          <div>
            <MainPageIcon className={cls.icon} />
          </div>
          <span className={cls.link}>{t('Главная')}</span>
        </AppLink>
        <AppLink
          className={classNames(cls.item)}
          theme={AppLinkTheme.INVERTED}
          to={routePath.about}
        >
          <div>
            <AboutPageIcon className={cls.icon} />
          </div>
          <span className={cls.link}>{t('О сайте')}</span>
        </AppLink>
      </div>
      <Button
        className={cls.collapseBtn}
        data-testid="sidebar-toggle"
        onClick={onToggle}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  )
}
