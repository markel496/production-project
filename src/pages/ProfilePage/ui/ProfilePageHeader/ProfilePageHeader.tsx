import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  getProfileReadonly,
  profileActions,
  updateProfileData
} from 'entities/Profile'
import { useSelector } from 'react-redux'

interface ProfilePageHeaderProps {
  className?: string
  isUpdated?: boolean
  isLoading?: boolean
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className, isLoading, isUpdated } = props
  const { t } = useTranslation('profile')

  const readonly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancel = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {readonly ? (
        <Button
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
          onClick={onEdit}
          disabled={isLoading}
        >
          {t('Редактировать')}
        </Button>
      ) : (
        <>
          <Button
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE_RED}
            onClick={onCancel}
            disabled={isLoading}
          >
            {t('Отменить')}
          </Button>
          {isUpdated && (
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onSave}
              disabled={isLoading}
            >
              {t('Сохранить')}
            </Button>
          )}
        </>
      )}
    </div>
  )
}
