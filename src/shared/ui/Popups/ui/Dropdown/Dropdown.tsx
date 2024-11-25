/* eslint-disable i18next/no-literal-string */
import { memo, Fragment, ReactNode } from 'react'
import { Menu } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import popupsCls from '../../styles/Popups.module.scss'
import cls from './Dropdown.module.scss'
import { PopupPosition } from 'shared/types/ui'
import { AppLink } from '../../../AppLink/AppLink'
import { mapPositionClasses } from '../../styles/consts'

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
  position: PopupPosition
}

export const Dropdown = memo((props: DropdownProps) => {
  const { className, items, trigger, position = 'bottom right' } = props

  return (
    <Menu
      className={classNames(popupsCls.wrapper, {}, [cls.Dropdown, className])}
      as={'div'}
    >
      <Menu.Button className={popupsCls.trigger} as="button">
        {trigger}
      </Menu.Button>
      <Menu.Items
        className={classNames(popupsCls.menu, {}, [
          cls.panel,
          mapPositionClasses[position]
        ])}
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
