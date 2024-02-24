import {
  ProfileCard,
  ValidateProfileError,
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileInitialData,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileValidateErrors,
  profileActions,
  profileReducer,
  validateProfileAge
} from 'entities/Profile'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { classNames } from 'shared/lib/classNames/classNames'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from 'shared/ui/Page/Page'

const initialReducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
  const { t } = useTranslation('profile')
  const { className } = props
  const [isUpdated, setIsUpdated] = useState(false)
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()

  const data = useSelector(getProfileData)
  const initialData = useSelector(getProfileInitialData)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)

  const validateErrorTranslates = useMemo(() => {
    return {
      [ValidateProfileError.INCORRECT_NAME]: t('Укажите ваше имя'),
      [ValidateProfileError.INCORRECT_LASTNAME]: t('Укажите вашу фамилию'),
      [ValidateProfileError.INCORRECT_AGE]: t('Укажите ваш возраст'),
      [ValidateProfileError.INCORRECT_CITY]: t('Укажите ваш город'),
      [ValidateProfileError.INCORRECT_USERNAME]: t('Укажите ваш логин'),
      [ValidateProfileError.INCORRECT_AVATAR]: t(
        'Неккоректная ссылка на аватар'
      ),
      [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
      [ValidateProfileError.NO_DATA]: t('Нет данных')
    }
  }, [t])

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || '' }))
    },
    [dispatch]
  )

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }))
    },
    [dispatch]
  )

  const onChangeAge = useCallback(
    (value?: string) => {
      if (validateProfileAge(value!)) {
        dispatch(profileActions.updateProfile({ age: value }))
      } else {
        return null
      }
    },
    [dispatch]
  )

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }))
    },
    [dispatch]
  )

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }))
    },
    [dispatch]
  )

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }))
      if (data?.currency !== initialData?.currency) {
        setIsUpdated(true)
      } else {
        setIsUpdated(false)
      }
    },
    [dispatch, data?.currency, initialData?.currency]
  )

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }))
      if (data?.country !== initialData?.country) {
        setIsUpdated(true)
      } else {
        setIsUpdated(false)
      }
    },
    [dispatch, data?.country, initialData?.country]
  )

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }))
    },
    [dispatch]
  )

  useInitialEffect(() => {
    dispatch(fetchProfileData(id))
  })

  useEffect(() => {
    setIsUpdated(JSON.stringify(data) !== JSON.stringify(initialData))
  }, [initialData, data])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Page className={classNames('', {}, [className])}>
        <ProfilePageHeader
          error={error}
          isUpdated={isUpdated}
          isLoading={isLoading}
          readonly={readonly}
        />
        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
            />
          ))}
        <ProfileCard
          data={data}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
          onChangeAvatar={onChangeAvatar}
          readonly={readonly}
          isLoading={isLoading}
          error={error}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
