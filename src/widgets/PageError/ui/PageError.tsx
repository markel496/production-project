import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PageError.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button'
import { VStack } from '@/shared/ui/Stack'

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation()

  const reloadPage = () => {
    location.reload()
  }

  return (
    <VStack
      className={classNames(cls.PageError, {}, [className])}
      align="center"
      justify="center"
      max
    >
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </VStack>
  )
}
