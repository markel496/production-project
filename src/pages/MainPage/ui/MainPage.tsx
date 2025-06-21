import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { Page } from '@/widgets/Page'
import { Rating } from '@/entities/Rating'
import { BugButton } from '@/features/bugButton'
import { Counter } from '@/entities/Counter'
import { getUserAuthData } from '@/entities/User'
import { toggleFeatures } from '@/shared/lib/features/toggleFeatures'
import { Card } from '@/shared/ui/Card'

const MainPage = () => {
  const { t } = useTranslation('main')

  const authData = useSelector(getUserAuthData)

  if (authData) {
    const rating = toggleFeatures({
      name: 'isArticleRatingEnabled',
      on: () => (
        <Rating
          title={'Как Вам главная страница?'}
          hasFeedback
          feedbackTitle={'Оставьте отзыв о главной странице'}
          placeholder={'Напишите что-нибудь...'}
        />
      ),
      off: () => <Card>{t('Рейтинг скоро появится!')}</Card>
    })

    const counter = toggleFeatures({
      name: 'isCounterEnabled',
      on: () => <Counter />,
      off: () => null
    })

    return (
      <Page data-testid="MainPage">
        {t('Главная страница')}
        <BugButton />
        {rating}
        {counter}
      </Page>
    )
  }

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <BugButton />
    </Page>
  )
}

export default MainPage
