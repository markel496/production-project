import { Fragment, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ListBox.module.scss'
import { Listbox } from '@headlessui/react'
import { Button } from '../Button/Button'

export interface ListBoxItem<T extends string> {
  value: T
  content: ReactNode
  disabled?: boolean
}

type ListBoxPosition = 'bottom' | 'top'

interface ListBoxProps<T extends string> {
  className?: string
  items?: ListBoxItem<T>[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  readonly?: boolean
  label?: string
  position?: ListBoxPosition
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    label,
    position = 'bottom'
  } = props

  return (
    <Listbox
      as="div"
      className={classNames(cls.ListBox, {}, [className])}
      value={value ?? defaultValue}
      onChange={onChange}
      disabled={readonly}
    >
      {label && (
        <Listbox.Label className={cls.label} as="span">
          {label + '>'}
        </Listbox.Label>
      )}
      <Listbox.Button className={cls.trigger}>
        <Button className={classNames('', { [cls.disabled]: readonly }, [])}>
          {value ?? defaultValue}
        </Button>
      </Listbox.Button>
      <Listbox.Options className={classNames(cls.options, {}, [cls[position]])}>
        {items?.map((item) => (
          <Listbox.Option
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            as={Fragment}
          >
            {({ active, selected }) => (
              <li
                className={classNames(cls.item, {
                  [cls.active]: active,
                  [cls.disabled]: item.disabled
                })}
              >
                {selected}
                {item.content}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
