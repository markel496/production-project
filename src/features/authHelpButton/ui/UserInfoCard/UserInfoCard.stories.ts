import i18n from '@/shared/config/i18n/i18n'

import { TestUser } from '../../model/const/userCards'

import { UserInfoCard } from './UserInfoCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UserInfoCard> = {
  title: 'Features/AuthHelpButton/UserInfoCard',
  component: UserInfoCard,
  tags: ['autodocs'],
  args: {
    t: i18n.t,
    ...TestUser
  },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof UserInfoCard>

export const Primary: Story = {}
export const WithNoExistOption: Story = {
  args: {
    ...TestUser,
    options: [
      {
        name: 'Нет админ панели',
        isExist: false
      }
    ]
  }
}
export const WithoutOptions: Story = {
  args: {
    t: i18n.t,
    ...TestUser,
    options: undefined
  }
}
