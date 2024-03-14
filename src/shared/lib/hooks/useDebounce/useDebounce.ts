/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useCallback, useRef } from 'react'

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef() as MutableRefObject<any>

  return useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      timer.current = setTimeout(() => {
        //До тех пор пока таймер очищается, callback вызван не будет
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}

//useThrottle позволяет выполнить одно событие в какой-то промежуток времени, а useDebounce отменяет предыдущее событие в течение какого-то времени
