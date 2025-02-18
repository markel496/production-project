import { Popover as HPopover } from '@headlessui/react'
import { ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import { PopupPosition } from '@/shared/types/ui'

import popupsCls from '../../styles/Popups.module.scss'

import { mapPositionClasses } from '../../styles/consts'

import cls from './Popover.module.scss'

interface PopoverProps {
  className?: string
  trigger: ReactNode
  children: ReactNode
  position: PopupPosition
  openedPopover?: string
}

export const Popover = (props: PopoverProps) => {
  const {
    className,
    children,
    trigger,
    openedPopover,
    position = 'bottom right'
  } = props

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [popupsCls.wrapper, className])}
    >
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <HPopover.Button
            className={classNames(popupsCls.trigger, {
              [openedPopover!]: open
            })}
            as="button"
          >
            {trigger}
          </HPopover.Button>
          <HPopover.Panel
            className={classNames(popupsCls.menu, {}, [
              cls.panel,
              mapPositionClasses[position]
            ])}
          >
            {children}
          </HPopover.Panel>
        </>
      )}
    </HPopover>
  )
}
