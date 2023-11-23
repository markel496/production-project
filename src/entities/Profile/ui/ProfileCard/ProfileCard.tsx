import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { Profile } from '../../model/types/profile'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'

interface ProfileCardProps {
  className?: string
  data?: Profile
  onChangeFirstname?: (value?: string) => void
  onChangeLastname?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
  onChangeAvatar?: (value?: string) => void
  readonly?: boolean
  isLoading?: boolean
  error?: string
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { t } = useTranslation('profile')
  const {
    className,
    data,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry,
    onChangeAvatar,
    readonly,
    isLoading,
    error
  } = props

  const mods: Mods = { [cls.editing]: !readonly }

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
        />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <div className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} alt="Аватарка" />
        </div>
      )}
      <Input
        className={cls.input}
        value={data?.first}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstname}
        readonly={readonly}
      />
      <Input
        className={cls.input}
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <Input
        className={cls.input}
        value={data?.age}
        placeholder={t('Ваш возраст')}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        className={cls.input}
        value={data?.city}
        placeholder={t('Город')}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        className={cls.input}
        value={data?.username}
        placeholder={t('Ваш логин')}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        className={cls.input}
        value={data?.avatar}
        placeholder={t('Ссылка на аватарку')}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </div>
  )
}
