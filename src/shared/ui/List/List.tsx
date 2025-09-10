import { ReactNode, memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './List.module.scss'

interface ListProps {
  className?: string
  list: ReactNode[]
  bullet?: string // символ
}

export const List = memo((props: ListProps) => {
  const { className, list, bullet } = props

  return (
    <ul className={classNames(cls.List, {}, [className])}>
      {list.map((element, idx) => (
        <li key={idx}>
          <span className={cls.bullet}>
            {typeof element === 'string' && bullet}
          </span>
          {element}
        </li>
      ))}
    </ul>
  )
})
