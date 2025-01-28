import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { ReactNode, RefObject } from 'react'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
  closeButtonRef?: RefObject<HTMLButtonElement>
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy, closeButtonRef } = props

  const { isMounted, isOpening, isClosing, closeHandler } = useModal({
    type: 'modal',
    isOpen,
    onClose,
    animationDelay: ANIMATION_DELAY,
    closeButtonRef
  })

  if (lazy && !isMounted) return null

  const mods: Mods = {
    [cls.opened]: isOpen && !isOpening,
    [cls.closing]: isClosing
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}
