import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { memo, useCallback, useMemo } from 'react'

import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { classNames } from '@/shared/lib/classNames/classNames'

import { Text, TextTheme } from '@/shared/ui/Text'

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import { VStack } from '@/shared/ui/Stack'

import { loginActions, loginReducer } from '../../model/slice/loginSlice'

import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'

import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'

import cls from './LoginForm.module.scss'

/**Можно было бы сразу передать в reducers объект напрямую, но в том случае на каждый рендер компонета внутри reducers создавался бы новый объект, новая ссылка. В данном случае объект будет всегда постоянный и ссылка на него меняться не будет  */
const initialReducers: ReducersList = {
  loginForm: loginReducer
}

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSuccess } = props
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)

  const errorTranslates = useMemo(() => {
    switch (error) {
      case 'Validation error':
        return t('Введите логин или пароль')

      case 'User not found':
        return t('Неверный логин или пароль')

      case 'Server error':
        return t('Ошибка сервера')

      default:
        return error
    }
  }, [t, error])

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )
  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    console.log(result)
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess()
    }
  }, [dispatch, username, password, onSuccess])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <VStack className={classNames(cls.LoginForm, {}, [className])} gap="10">
        <Text title={t('Форма авторизации')} />
        {error && <Text text={errorTranslates} theme={TextTheme.ERROR} />}
        <Input
          placeholder={t('Пользователь')}
          onChange={onChangeUsername}
          value={username}
          autoFocus={Boolean(!isLoading)}
        />
        <Input
          placeholder={t('Пароль')}
          value={password}
          onChange={onChangePassword}
        />
        <Button
          className={cls.formBtn}
          theme={ButtonTheme.OUTLINE}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('Войти')}
        </Button>
      </VStack>
    </DynamicModuleLoader>
  )
})

export default LoginForm
