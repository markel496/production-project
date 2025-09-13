import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'

import { Modal } from '@/shared/ui/Modal'
import { Text, TextAlign } from '@/shared/ui/Text'

import { Drawer } from '@/shared/ui/Drawer'

import { UserInfoCard } from '../UserInfoCard/UserInfoCard'
import { userCards } from '../../model/const/userCards'

import cls from './AuthHelpModal.module.scss'

interface AuthHelpModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const AuthHelpModal = memo((props: AuthHelpModalProps) => {
  const { isOpen, onClose } = props

  const { t } = useTranslation('main')

  const content = (
    <>
      <Text
        className={cls.modalItem}
        text={t(
          'В проекте использую feature flags и храню пользовательские настройки (например, тему) в базе данных.'
        )}
        align={TextAlign.CENTER}
      />
      <Text
        className={cls.modalItem}
        title={t('Данные для авторизации')}
        align={TextAlign.CENTER}
      />

      {userCards.map(({ user, login, password, options }) => (
        <UserInfoCard
          className={cls.modalItem}
          user={user}
          login={login}
          password={password}
          options={options}
          key={user}
          t={t}
        />
      ))}
    </>
  )

  if (isMobile) {
    return (
      <Drawer
        clsContent={cls.drawerContent}
        isOpen={isOpen}
        onClose={onClose}
        lazy
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Modal clsContent={cls.modalContent} isOpen={isOpen} onClose={onClose} lazy>
      {content}
    </Modal>
  )
})
