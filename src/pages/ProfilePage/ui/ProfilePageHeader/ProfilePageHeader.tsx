import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { profileActions, updateProfileData } from 'entities/Profile'
import { getCanEditProfile } from '../../model/selectors/profile'

interface ProfilePageHeaderProps {
  className?: string
  isUpdated?: boolean
  isLoading?: boolean
  error?: string
  readonly?: boolean
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className, isLoading, isUpdated, error, readonly } = props
  const { t } = useTranslation('profile')

  const dispatch = useAppDispatch()

  const canEdit = useSelector(getCanEditProfile)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancel = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  if (error) {
    return (
      <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
        <Text title={t('Профиль')} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {readonly ? (
        canEdit && (
          <Button
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onEdit}
            disabled={isLoading}
          >
            {t('Редактировать')}
          </Button>
        )
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
