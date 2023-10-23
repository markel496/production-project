import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'

interface LoginFormProps {
  className?: string
}

export const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props
  const { t } = useTranslation()

  const { username, password, isLoading, error } = useSelector(getLoginState)
  const dispatch = useDispatch()

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
  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, username, password])

  return (
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
  )
})
