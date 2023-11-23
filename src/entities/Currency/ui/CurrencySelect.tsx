import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Currency } from '../model/types/currency'
import { Select } from 'shared/ui/Select/Select'
import { memo, useCallback } from 'react'

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
    <Select
      className={classNames('', {}, [className])}
      label={t('Укажите валюту')}
      value={value}
      onChange={onChangeHandler}
      options={options}
      readonly={readonly}
    />
  )
})
