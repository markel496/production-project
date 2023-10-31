import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  const [isAuthModal, setisAuthModal] = useState(false)
  const { t } = useTranslation()

  const onShowModal = useCallback(() => {
    setisAuthModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setisAuthModal(false)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={classNames(cls.links)}>
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onLogout}>
            {t('Выйти')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={classNames(cls.links)}>
        <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
          {t('Войти')}
        </Button>
        {isAuthModal && (
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        )}
      </div>
    </div>
  )
}
