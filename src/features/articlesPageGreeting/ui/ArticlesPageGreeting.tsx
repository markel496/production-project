import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'

import { Modal } from '@/shared/ui/Modal'
import { Text } from '@/shared/ui/Text'
import { saveUserSettings, useGetUserSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Drawer } from '@/shared/ui/Drawer'

export const ArticlesPageGreeting = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isOpenGreetingModal, setIsOpenGreetingModal] = useState(false)

  const { isArticlesPageWasOpened } = useGetUserSettings()

  const onCloseModal = () => setIsOpenGreetingModal(false)

  const text = (
    <Text
      title={t('Добро пожаловать на страницу!')}
      text={t(
        'Вы видите это модальное окно, тк заходите первый раз на эту страницу.'
      )}
    />
  )

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpenGreetingModal(true)
      dispatch(saveUserSettings({ isArticlesPageWasOpened: true }))
    }
  }, [isArticlesPageWasOpened, dispatch])

  if (isMobile) {
    return (
      <Drawer isOpen={isOpenGreetingModal} onClose={onCloseModal} lazy>
        {text}
      </Drawer>
    )
  }

  return (
    <Modal isOpen={isOpenGreetingModal} onClose={onCloseModal} lazy>
      {text}
    </Modal>
  )
})
