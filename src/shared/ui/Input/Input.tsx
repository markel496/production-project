import {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import { HStack } from '../Stack'

import cls from './Input.module.scss'

/**Omit забирает все пропсы у InputHTMLAttributes<HTMLInputElement>, но исключает 'onChange' и readOnly */
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'readOnly'
>

interface InputProps extends HTMLInputProps {
  className?: string
  onChange?: (value: string) => void
  readonly?: boolean
  clearError?: () => void
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    readonly,
    clearError,
    ...otherProps
  } = props

  const mods: Mods = { [cls.readonly]: readonly }

  const [isFocused, setIsFocused] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)

  const ref = useRef<HTMLInputElement>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
    // if (onChange?.(e.target.value) !== null) {
    //   setCaretPosition(e.target.value.length)
    // }
  }

  const onFocus = () => {
    clearError?.()
    setIsFocused(true)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0)
  }

  const isCaretVisible = isFocused && !readonly

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autoFocus])

  return (
    <HStack className={classNames(cls.inputWrapper, mods, [className])} gap="5">
      {placeholder && <div>{`${placeholder}>`}</div>}
      <div className={cls.caretWrapper}>
        <input
          className={cls.input}
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          autoFocus={autoFocus}
          readOnly={readonly}
          {...otherProps}
        />
        {isCaretVisible && (
          <span
            style={{ left: `${caretPosition * 9}px` }}
            className={cls.caret}
          />
        )}
      </div>
    </HStack>
  )
})
