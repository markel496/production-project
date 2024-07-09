import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Flex.module.scss'

type FlexJustify = 'start' | 'center' | 'end' | 'between'
type FlexAlign = 'start' | 'center' | 'end'
type FlexDirection = 'row' | 'column'
type FlexGap = '5' | '8' | '10' | '16' | '20' | '32' // Отступы по дизайну
type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween
}

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd
}

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn
}

const gapClasses: Record<FlexGap, string> = {
  5: cls.gap5,
  8: cls.gap8,
  10: cls.gap10,
  16: cls.gap16,
  20: cls.gap20,
  32: cls.gap32
}

export interface FlexProps extends DivProps {
  className?: string
  children: ReactNode
  justify?: FlexJustify
  align?: FlexAlign
  direction: FlexDirection
  gap?: FlexGap
  max?: boolean
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max
  } = props

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap]
  ]

  return (
    <div className={classNames(cls.Flex, { [cls.max]: max }, classes)}>
      {children}
    </div>
  )
}
