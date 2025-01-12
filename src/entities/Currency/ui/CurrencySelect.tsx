import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Currency } from '../model/types/currency'
import { memo, useCallback } from 'react'
import { ListBox } from '@/shared/ui/Popups'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (currency: Currency) => void
  readonly?: boolean
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR }
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props
  const { t } = useTranslation()

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency)
    },
    [onChange]
  )

  return (
    <ListBox
      className={classNames('', {}, [className])}
      label={t('Укажите валюту')}
      value={value}
      onChange={onChangeHandler}
      items={options}
      readonly={readonly}
      position="top right"
    />
  )
})
