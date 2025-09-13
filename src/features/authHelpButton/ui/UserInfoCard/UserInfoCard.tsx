import { memo } from 'react'
import { TFunction } from 'react-i18next'

import { Card } from '@/shared/ui/Card'
import { Text } from '@/shared/ui/Text'

import { UserCard } from '../../model/types/userCard'

import cls from './UserInfoCard.module.scss'

interface UserInfoCardProps extends UserCard {
  className?: string
  t: TFunction<'main', undefined>
}

export const UserInfoCard = memo((props: UserInfoCardProps) => {
  const { className, user, login, password, options, t } = props

  return (
    <Card className={className}>
      <Text className={cls.user} title={user} />
      <Text className={cls.login} text={`${t('Логин')}: ${login}`} />
      <Text className={cls.password} text={`${t('Пароль')}: ${password}`} />
      {options?.map(({ name, isExist }, idx) => (
        <Text className={isExist ? cls.yes : cls.no} text={t(name)} key={idx} />
      ))}
    </Card>
  )
})
