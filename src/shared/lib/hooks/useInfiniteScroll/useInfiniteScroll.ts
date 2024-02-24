import { MutableRefObject, useEffect } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const triggerElement = triggerRef.current

    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: 1.0
      }

      observer = new IntersectionObserver(([entry]) => {
        //callback отрабатывает только когда элемент появляется в зоне видимости
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggerElement)
    }

    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement)
      }
    }
  }, [triggerRef, wrapperRef, callback])
}

/**callback вызывается в момент, когда на экране появился элемент за которым мы следим (triggerRef). callback принимает 2 аргумента (entries, observer). entries - массив элементов за которыми мы наблюдаем. С помощью диструктуризации вытаскиваю первый элемент этого массива */
