import { memo, useCallback, useState } from 'react'

import { Button, ButtonSize } from '@/shared/ui/Button'
import HelpIcon from '@/shared/assets/icons/help.svg'
import { Icon } from '@/shared/ui/Icon'

import { AuthHelpModal } from '../AuthHelpModal/AuthHelpModal'

import cls from './AuthHelpButton.module.scss'

interface AuthHelpButtonProps {
  className?: string
}

export const AuthHelpButton = memo((props: AuthHelpButtonProps) => {
  const { className } = props
  const [isHelpModal, setIsHelpModal] = useState(false)

  const onShowModal = useCallback(() => {
    setIsHelpModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsHelpModal(false)
  }, [])

  return (
    <div className={className}>
      <Button
        className={cls.authHelpBtn}
        size={ButtonSize.XL}
        square
        onClick={onShowModal}
      >
        <Icon Svg={HelpIcon} />
      </Button>
      <AuthHelpModal isOpen={isHelpModal} onClose={onCloseModal} />
    </div>
  )
})
