import { BugButton } from 'app/providers/ErrorBoundary'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (
    <Page>
      {t('Главная страница')}
      <BugButton />
    </Page>
  )
}

export default MainPage
