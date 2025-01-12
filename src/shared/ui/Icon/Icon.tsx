import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'
import { memo } from 'react'

interface IconProps {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  className?: string
  inverted?: boolean
}

export const Icon = memo((props: IconProps) => {
  const { Svg, className, inverted } = props

  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className
      ])}
    />
  )
})
