import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Country } from '../model/types/country'
import { memo, useCallback } from 'react'
import { ListBox } from 'shared/ui/ListBox/ListBox'

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
      className={classNames('', {}, [className])}
      label={t('Укажите страну')}
      value={value}
      onChange={onChangeHandler}
      items={options}
      readonly={readonly}
      position="top"
    />
  )
})
