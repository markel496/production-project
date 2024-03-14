import { HTMLAttributes, ReactNode, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINE = 'outline'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  theme?: CardTheme
  children: ReactNode
}

export const Card = memo((props: CardProps) => {
  const { className, theme = CardTheme.NORMAL, children, ...otherProps } = props

  return (
    <div
      className={classNames(cls.Card, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  )
})
