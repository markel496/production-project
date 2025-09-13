import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'

export const BugButton = ({ className }: { className?: string }) => {
  const [error, setError] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (error) {
      throw new Error('Тестовый компонент для ErrorBoundary')
    }
  }, [error])

  return (
    <Button className={className} onClick={() => setError(true)}>
      {t('ОШИБКА')}
    </Button>
  )
}
