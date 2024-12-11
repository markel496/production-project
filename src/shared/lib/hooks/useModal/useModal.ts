import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

type ModalType = 'modal' | 'drawer'

interface UseModalOptions {
  type: ModalType
  isOpen?: boolean
  onClose?: () => void
  animationDelay?: number
}

export function useModal({
  type,
  isOpen,
  onClose,
  animationDelay
}: UseModalOptions) {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpening, setIsOpening] = useState(true) //Для анимации
  const [isClosing, setIsClosing] = useState(false)

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  /*На каждый перерендер компонента функция создаются заново (у каждой из таких функций будет новая ссылка). По хорошему нужно сохранять ссылку на функцию. Для этого исользуется useCallback - он мемоизирует значение функции, запоминает его и всегда возвращает ссылку на одну и ту же функцию, если в массиве зависимостей ничего не изменилось*/

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, animationDelay)
    }
  }, [onClose, animationDelay])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeHandler()
      }
    },
    [closeHandler, isOpen]
  )

  useEffect(() => {
    if (isMounted) setIsOpening(false)
  }, [isMounted])

  useEffect(() => {
    if (isOpen) setIsMounted(true)
  }, [isOpen])

  useEffect(() => {
    if (type === 'modal') {
      window.addEventListener('keydown', onKeyDown)

      return () => {
        clearTimeout(timerRef.current)
        removeEventListener('keydown', onKeyDown)
      }
    }
  }, [type, isOpen, onKeyDown])

  return {
    isMounted,
    isOpening,
    isClosing,
    closeHandler
  }
}
