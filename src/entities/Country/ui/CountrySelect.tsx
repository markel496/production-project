import { useTranslation } from 'react-i18next'

import { memo, useCallback } from 'react'

import { ListBox } from '@/shared/ui/Popups'

import { Country } from '../model/types/country'

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (currency: Country) => void
  readonly?: boolean
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Kazakhstan, content: Country.Kazakhstan }
]

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props
  const { t } = useTranslation()

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country)
    },
    [onChange]
  )

  return (
    <ListBox
      className={className}
      label={t('Укажите страну')}
      value={value}
      onChange={onChangeHandler}
      items={options}
      readonly={readonly}
      position="top right"
    />
  )
})
