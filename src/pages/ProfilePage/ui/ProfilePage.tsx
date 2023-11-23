import {
  ProfileCard,
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileInitialData,
  getProfileIsLoading,
  getProfileReadonly,
  profileActions,
  profileReducer
} from 'entities/Profile'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { classNames } from 'shared/lib/classNames/classNames'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

const initialReducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props
  const [isUpdated, setIsUpdated] = useState(false)

  const dispatch = useAppDispatch()

  const data = useSelector(getProfileData)
  const initialData = useSelector(getProfileInitialData)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const readonly = useSelector(getProfileReadonly)

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
      const regex = /^[0-9\b]+$/
      if (
        value === '' ||
        (regex.test(value!) &&
          Number(value) > 0 &&
          Number(value) < 100 &&
          value!.length < 3)
      ) {
        dispatch(profileActions.updateProfile({ age: value }))
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

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  useEffect(() => {
    setIsUpdated(JSON.stringify(data) !== JSON.stringify(initialData))
  }, [initialData, data])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader isUpdated={isUpdated} isLoading={isLoading} />
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
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
