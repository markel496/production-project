import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/componens/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

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
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')} />
        {error && (
          <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />
        )}
        <Input
          className={cls.input}
          placeholder={t('Пользователь')}
          onChange={onChangeUsername}
          value={username}
          autoFocus
        />
        <Input
          className={cls.input}
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
      </div>
    </DynamicModuleLoader>
  )
})

export default LoginForm
