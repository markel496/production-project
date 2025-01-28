import { BugButton } from '@/app/providers/ErrorBoundary'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Rating } from '@/entities/Rating'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (
    <Page>
      {t('Главная страница')}
      <BugButton />
      <Rating
        title={t('Как Вам статья?')}
        hasFeedback
        feedbackTitle={t('Оставьте отзыв о статье')}
        placeholder={t('Напишите что-нибудь...')}
      />
    </Page>
  )
}

export default MainPage
