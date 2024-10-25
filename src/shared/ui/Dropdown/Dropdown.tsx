/* eslint-disable i18next/no-literal-string */
import { memo, Fragment, ReactNode } from 'react'
import { Menu } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Dropdown.module.scss'
import { DropdownPosition } from 'shared/types/ui'
import { AppLink } from '../AppLink/AppLink'

interface DropdownItem {
  content?: ReactNode
  disabled?: boolean
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  position?: DropdownPosition
}

const mapPositionClass: Record<DropdownPosition, string> = {
  'bottom left': cls.bottomLeft,
  'bottom right': cls.bottomRight,
  'top left': cls.topLeft,
  'top right': cls.topRight
}

export const Dropdown = memo((props: DropdownProps) => {
  const { className, items, trigger, position = 'bottom left' } = props

  return (
    <Menu className={classNames(cls.Dropdown, {}, [className])} as={'div'}>
      <Menu.Button className={cls.btn} as="button">
        {trigger}
      </Menu.Button>
      <Menu.Items
        className={classNames(cls.menu, {}, [mapPositionClass[position]])}
      >
        {items.map((item, idx) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              className={classNames(cls.item, {
                [cls.active]: active,
                [cls.disabled]: item.disabled
              })}
              onClick={item.onClick}
              type="button"
              disabled={item.disabled}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
                key={idx}
              >
                {content}
              </Menu.Item>
            )
          }
          return (
            <Menu.Item as={Fragment} disabled={item.disabled} key={idx}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
})
