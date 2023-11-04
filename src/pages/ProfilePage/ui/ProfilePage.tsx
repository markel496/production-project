import { profileReducer } from 'entities/Profile'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'

const initialReducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props
  const { t } = useTranslation('profile')

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames('', {}, [className])}>
        {t('Страница профиля')}
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
