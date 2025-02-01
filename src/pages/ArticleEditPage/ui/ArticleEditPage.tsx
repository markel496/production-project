import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Page } from '@/widgets/Page'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props
  const { t } = useTranslation('edit')
  const { id } = useParams<{ id: string }>()

  const isEdit = Boolean(id)

  return (
    <Page className={className}>
      {isEdit ? t('Редактирование статьи') + id : t('Создание новой статьи')}
    </Page>
  )
})

export default ArticleEditPage
