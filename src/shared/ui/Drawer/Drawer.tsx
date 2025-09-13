import { ReactNode, useCallback, useEffect } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import { useModal } from '@/shared/lib/hooks/useModal/useModal'

import {
  useAnimationLibs,
  AnimationProvider
} from '@/shared/lib/componens/AnimationProvider'

import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'

import cls from './Drawer.module.scss'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
  clsContent?: string
}

const ANIMATION_DELAY = 300
const height = typeof window !== 'undefined' ? window.innerHeight - 100 : 600

const DrawerContent = (props: DrawerProps) => {
  const { className, children, isOpen, onClose, lazy, clsContent } = props

  const { Gesture, Spring } = useAnimationLibs()

  const { isMounted, isClosing, closeHandler } = useModal({
    type: 'drawer',
    isOpen,
    onClose,
    animationDelay: ANIMATION_DELAY
  })

  const [{ y }, api] = Spring.useSpring(() => ({ y: height }))

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false })
  }, [api])

  useEffect(() => {
    if (isOpen) {
      openDrawer()
    }
  }, [api, isOpen, openDrawer])

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose
    })
  }

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel
    }) => {
      if (my < -70) cancel()

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close()
        } else {
          openDrawer()
        }
      } else {
        api.start({ y: my, immediate: true })
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true
    }
  )

  if (lazy && !isMounted) return null

  const display = y.to((py) => (py < height ? 'flex' : 'none'))

  return (
    <Portal>
      <div
        className={classNames(
          cls.Drawer,
          { [cls.closing]: isClosing, [cls.opened]: isOpen },
          [className]
        )}
      >
        <Overlay onClick={closeHandler} />
        <Spring.a.div
          className={classNames(cls.sheet, {}, [clsContent])}
          style={{ display, bottom: 0, y }}
          {...bind()}
        >
          <div className={cls.scrollArea}>{children}</div>
        </Spring.a.div>
      </div>
    </Portal>
  )
}

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs()

  if (!isLoaded) return null

  return <DrawerContent {...props} />
}

export const Drawer = (props: DrawerProps) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  )
}
