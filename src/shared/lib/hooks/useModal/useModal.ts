import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

type ModalType = 'modal' | 'drawer'

interface UseModalOptions {
  type: ModalType
  isOpen?: boolean
  onClose?: () => void
  animationDelay?: number
  closeButtonRef?: RefObject<HTMLButtonElement>
}

export function useModal({
  type,
  isOpen,
  onClose,
  animationDelay,
  closeButtonRef
}: UseModalOptions) {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpening, setIsOpening] = useState(true) //Для анимации первого рендера
  const [isClosing, setIsClosing] = useState(false)

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  /*На каждый перерендер компонента функция создаются заново (у каждой из таких функций будет новая ссылка). По хорошему нужно сохранять ссылку на функцию. Для этого исользуется useCallback - он мемоизирует значение функции, запоминает его и всегда возвращает ссылку на одну и ту же функцию, если в массиве зависимостей ничего не изменилось*/

  const openHandler = useCallback(() => {
    if (isMounted && isOpening) {
      timerRef.current = setTimeout(() => {
        setIsOpening(false)
      })

      return () => {
        clearTimeout(timerRef.current)
      }
    }
  }, [isMounted, isOpening])

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

  if (closeButtonRef) {
    const closeButton = closeButtonRef.current

    if (closeButton) closeButton.onclick = closeHandler
  }

  useLayoutEffect(() => {
    if (isOpen && !isMounted) {
      setIsMounted(true)
    }
    openHandler()
  }, [isOpen, isMounted, openHandler])

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
