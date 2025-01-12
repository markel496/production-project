import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import {
  editableProfileCardActions,
  editableProfileCardReducer
} from '../../model/slices/editableProfileCardSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileInitialData } from '../../model/selectors/getProfileInitialData/getProfileInitialData'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { ValidateProfileError } from '../../model/consts/editableProfileCardConsts'
import { validateProfileAge } from '../../lib/validateProfileAge/validateProfileAge'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { Text, TextTheme } from '@/shared/ui/Text/Text'
import { ProfileCard } from '@/entities/Profile'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'

const initialReducers: ReducersList = {
  profile: editableProfileCardReducer
}

interface EditableProfileCardProps {
  id?: string
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { id } = props
  const { t } = useTranslation('profile')
  const [isUpdated, setIsUpdated] = useState(false)

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
      dispatch(editableProfileCardActions.updateProfile({ first: value || '' }))
    },
    [dispatch]
  )

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(
        editableProfileCardActions.updateProfile({ lastname: value || '' })
      )
    },
    [dispatch]
  )

  const onChangeAge = useCallback(
    (value?: string) => {
      if (validateProfileAge(value!)) {
        dispatch(editableProfileCardActions.updateProfile({ age: value }))
      } else {
        return null
      }
    },
    [dispatch]
  )

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(editableProfileCardActions.updateProfile({ city: value || '' }))
    },
    [dispatch]
  )

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(
        editableProfileCardActions.updateProfile({ username: value || '' })
      )
    },
    [dispatch]
  )

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(editableProfileCardActions.updateProfile({ currency }))
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
      dispatch(editableProfileCardActions.updateProfile({ country }))
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
      dispatch(
        editableProfileCardActions.updateProfile({ avatar: value || '' })
      )
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
      <EditableProfileCardHeader
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
            data-testid="EditableProfileCard.Error"
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
    </DynamicModuleLoader>
  )
})
