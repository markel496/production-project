import { memo, useState } from 'react'

import { useSelector } from 'react-redux'

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'

import { classNames } from '@/shared/lib/classNames/classNames'

import { VStack } from '@/shared/ui/Stack'

import { SidebarItem } from '../SidebarItem/SidebarItem'

import { getSidebarItems } from '../../model/selectors/getSidebarItems'


import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  const sidebarItemsList = useSelector(getSidebarItems)

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <VStack role="navigation" className={cls.items} gap={'16'}>
        {sidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </VStack>
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
    </aside>
  )
})
