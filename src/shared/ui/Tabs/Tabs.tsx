import { ReactNode, useCallback } from 'react'

import { Card, CardTheme } from '../Card/Card'
import { HStack } from '../Stack'

import cls from './Tabs.module.scss'

export interface TabItem<T extends string> {
  value: T
  content: ReactNode
}

interface TabsProps<T extends string> {
  className?: string
  tabs: TabItem<T>[]
  value: T //Выбранное значение
  onTabClick: (tab: TabItem<T>) => void //Переключение табов
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { className, tabs, value, onTabClick } = props

  const onClick = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab)
    },
    [onTabClick]
  )

  return (
    <HStack className={className} gap="8">
      {tabs.map((tab) => (
        <Card
          className={cls.tab}
          theme={tab.value !== value ? CardTheme.NORMAL : CardTheme.OUTLINE}
          key={tab.value}
          onClick={onClick(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </HStack>
  )
}
