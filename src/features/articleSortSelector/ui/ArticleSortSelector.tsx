import { memo, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { Select, SelectOption } from '@/shared/ui/Select'
import { ArticleSortField } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import { HStack } from '@/shared/ui/Stack'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeSort: (newSort: ArticleSortField) => void
  onChangeOrder: (newOrder: SortOrder) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeSort, onChangeOrder } = props
  const { t } = useTranslation('articles')

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      { value: ArticleSortField.CREATED, content: t('По дате создания') },
      { value: ArticleSortField.TITLE, content: t('По названию') },
      { value: ArticleSortField.VIEWS, content: t('По просмотрам') }
    ],
    [t]
  )

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      { value: 'asc', content: t('По возрастанию') },
      { value: 'desc', content: t('По убыванию') }
    ],
    [t]
  )

  return (
    <HStack className={className} gap="5">
      <Select<ArticleSortField>
        label={t('Сортировать')}
        value={sort}
        onChange={onChangeSort}
        options={sortFieldOptions}
      />
      <Select value={order} onChange={onChangeOrder} options={orderOptions} />
    </HStack>
  )
})
