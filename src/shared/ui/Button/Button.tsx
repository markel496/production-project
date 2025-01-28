import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, forwardRef, memo } from 'react'

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  max?: boolean
}

const ButtonContent = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      className,
      children,
      theme = ButtonTheme.OUTLINE,
      square,
      size = ButtonSize.M,
      disabled,
      max,
      ...otherProps
    } = props

    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
      [cls.max]: max
    }

    return (
      <button
        ref={ref}
        type="button"
        className={classNames(cls.Button, mods, [
          className,
          cls[theme],
          cls[size]
        ])}
        disabled={disabled}
        {...otherProps}
      >
        {children}
      </button>
    )
  }
)

export const Button = memo(ButtonContent)
