import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import cls from './EditableProfileCardHeader.module.scss'
import { HStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { editableProfileCardActions } from '../../model/slices/editableProfileCardSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { getCanEditProfile } from '../../model/selectors/getCanEditProfile/getCanEditProfile'

interface EditableProfileCardHeaderProps {
  isUpdated?: boolean
  isLoading?: boolean
  error?: string
  readonly?: boolean
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { isLoading, isUpdated, error, readonly } = props
    const { t } = useTranslation('profile')

    const dispatch = useAppDispatch()

    const canEdit = useSelector(getCanEditProfile)

    const onEdit = useCallback(() => {
      dispatch(editableProfileCardActions.setReadonly(false))
    }, [dispatch])

    const onCancel = useCallback(() => {
      dispatch(editableProfileCardActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
      dispatch(updateProfileData())
    }, [dispatch])

    if (error) {
      return (
        <div className={cls.ProfilePageHeader}>
          <Text title={t('Профиль')} />
        </div>
      )
    }

    return (
      <HStack className={cls.EditableProfileCardHeader}>
        <Text title={t('Профиль')} />
        {readonly ? (
          canEdit && (
            <Button
              className={cls.editBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
              disabled={isLoading}
              data-testid="EditableProfileCardHeader.EditBtn"
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
              data-testid="EditableProfileCardHeader.CancelBtn"
            >
              {t('Отменить')}
            </Button>
            {isUpdated && (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
                disabled={isLoading}
                data-testid="EditableProfileCardHeader.SendBtn"
              >
                {t('Сохранить')}
              </Button>
            )}
          </>
        )}
      </HStack>
    )
  }
)
