import { useTranslation } from 'react-i18next'

import { Page } from '@/widgets/Page'
import { Rating } from '@/entities/Rating'
import { BugButton } from '@/features/bugButton'
import { Counter } from '@/entities/Counter'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <BugButton />
      <Rating
        title={t('Как Вам статья?')}
        hasFeedback
        feedbackTitle={t('Оставьте отзыв о статье')}
        placeholder={t('Напишите что-нибудь...')}
      />
      <Counter />
    </Page>
  )
}

export default MainPage
