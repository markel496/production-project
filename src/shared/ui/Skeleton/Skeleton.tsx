import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Skeleton.module.scss'
import { CSSProperties } from 'react'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  border?: string
}

export const Skeleton = (props: SkeletonProps) => {
  const { className, width, height, border } = props

  // Использовать useMemo особого смысла нет, потому что его перерисовки не так страшны и он отображается только на этапе загрузки
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border
  }

  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={styles}
    ></div>
  )
}
