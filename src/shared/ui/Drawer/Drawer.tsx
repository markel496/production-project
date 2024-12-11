import { memo, ReactNode } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import { useModal } from 'shared/lib/hooks/useModal/useModal'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const ANIMATION_DELAY = 300

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, isOpen, onClose } = props

  const { isOpening, isClosing, closeHandler } = useModal({
    type: 'drawer',
    isOpen,
    onClose,
    animationDelay: ANIMATION_DELAY
  })

  const mods: Mods = {
    [cls.opened]: isOpen && !isOpening,
    [cls.closing]: isClosing
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
})
