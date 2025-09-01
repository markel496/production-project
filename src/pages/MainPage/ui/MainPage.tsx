import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { Page } from '@/widgets/Page'
import { Rating } from '@/entities/Rating'
import { BugButton } from '@/features/bugButton'
import { Counter } from '@/entities/Counter'
import { getUserAuthData } from '@/entities/User'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/Card'

const MainPage = () => {
  const { t } = useTranslation('main')

  const authData = useSelector(getUserAuthData)

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <BugButton />
      {authData && (
        <>
          <ToggleFeatures
            feature="isArticleRatingEnabled"
            on={
              <Rating
                title={'Как Вам главная страница?'}
                hasFeedback
                feedbackTitle={'Оставьте отзыв о главной странице'}
                placeholder={'Напишите что-нибудь...'}
              />
            }
            off={
              <Card style={{ textAlign: 'center' }}>
                {t('Рейтинг скоро появится!')}
              </Card>
            }
          />
          <ToggleFeatures
            feature="isCounterEnabled"
            on={<Counter />}
            off={<></>}
          />
        </>
      )}
    </Page>
  )
}

export default MainPage
