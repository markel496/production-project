import { MutableRefObject, ReactNode, memo, UIEvent, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { saveScrollActions } from '../model/slice/saveScrollSlice'
import { useLocation } from 'react-router-dom'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useSelector } from 'react-redux'
import { getScrollPositionByPath } from '../model/selectors/getScrollPosition'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
  isSaveScroll?: boolean
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd, isSaveScroll = false } = props
  const dispatch = useAppDispatch()

  const { pathname } = useLocation()

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  const scrollPosition = useSelector(getScrollPositionByPath(pathname))

  const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
    if (isSaveScroll) {
      dispatch(
        saveScrollActions.setScrollPosition({
          position: e.currentTarget.scrollTop,
          path: pathname
        })
      )
    }
  }, 500)

  useInfiniteScroll({ wrapperRef, triggerRef, callback: onScrollEnd })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScrollHandler}
    >
      {children}
      {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
    </section>
  )
})
