import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text'

import cls from './NotFoundPage.module.scss'

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation()
  return (
    <Page
      className={classNames(cls.NotFoundPage, {}, [className])}
      data-testid="NotFoundPage"
    >
      <Text
        text={t('Страница не найдена')}
        theme={TextTheme.ERROR}
        size={TextSize.L}
        align={TextAlign.CENTER}
      />
    </Page>
  )
}
