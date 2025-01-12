import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import { CSSProperties, memo, useMemo } from 'react'

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: number
}

export const Avatar = memo((props: AvatarProps) => {
  const { className, src, alt, size = 100 } = props

  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size
    }
  }, [size])

  if (!src) {
    return (
      <div
        className={classNames(cls.Avatar, {}, [className])}
        style={styles}
      ></div>
    )
  }

  return (
    <img
      className={classNames(cls.Avatar, {}, [className])}
      src={src}
      alt={alt}
      style={styles}
    />
  )
})
