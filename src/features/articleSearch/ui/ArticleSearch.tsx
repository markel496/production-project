import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'

interface ArticleSearchProps {
  className?: string
  search: string
  onChangeSearch: (search: string) => void
}

export const ArticleSearch = memo((props: ArticleSearchProps) => {
  const { className, search, onChangeSearch } = props
  const { t } = useTranslation('articles')

  return (
    <Card className={className}>
      <Input
        value={search}
        onChange={onChangeSearch}
        placeholder={t('Поиск')}
      />
    </Card>
  )
})
