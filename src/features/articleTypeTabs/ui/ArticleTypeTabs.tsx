import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ArticleType } from '@/entities/Article'
import { TabItem, Tabs } from '@/shared/ui/Tabs'

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onChangeTab: (newTab: TabItem<ArticleType>) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeTab } = props
  const { t } = useTranslation('articles')

  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      { value: ArticleType.ALL, content: t('Все') },
      { value: ArticleType.ECONOMICS, content: t('Экономика') },
      { value: ArticleType.IT, content: t('Айти') },
      { value: ArticleType.POLITICS, content: t('Политика') },
      { value: ArticleType.SCIENCE, content: t('Наука') },
      { value: ArticleType.SPORT, content: t('Спорт') }
    ],
    [t]
  )

  return (
    <Tabs
      className={className}
      tabs={typeTabs}
      value={value}
      onTabClick={onChangeTab}
    />
  )
})
