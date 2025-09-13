import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { Page } from '@/widgets/Page'
import { BugButton } from '@/features/bugButton'
import { Counter } from '@/entities/Counter'
import { getUserAuthData } from '@/entities/User'
import { ToggleFeatures } from '@/shared/lib/features'
import { AuthHelpButton } from '@/features/authHelpButton'

import cls from './MainPage.module.scss'

const MainPage = () => {
  const { t } = useTranslation('main')

  const authData = useSelector(getUserAuthData)

  return (
    <Page className={cls.MainPage} data-testid="MainPage">
      {t('Главная страница')}
      <BugButton className={cls.bugButton} />
      {authData ? (
        <>
          <ToggleFeatures
            feature="isCounterEnabled"
            on={<Counter />}
            off={<></>}
          />
        </>
      ) : (
        <AuthHelpButton className={cls.authHelpBtn} />
      )}
    </Page>
  )
}

export default MainPage
