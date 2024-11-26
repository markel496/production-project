import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  MutableRefObject
} from 'react'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props

  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.closing]: isClosing
  }

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  /*На каждый перерендер компонента функция создаются заново (у каждой из таких функций будет новая ссылка). По хорошему нужно сохранять ссылку на функцию. Для этого исользуется useCallback - он мемоизирует значение функции, запоминает его и всегда возвращает ссылку на одну и ту же функцию, если в массиве зависимостей ничего не изменилось*/

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeHandler()
      }
    },
    [closeHandler, isOpen]
  )

  useEffect(() => {
    if (isOpen) setIsMounted(true)
  }, [isOpen])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(timerRef.current)
      removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  if (lazy && !isMounted) return null

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}
