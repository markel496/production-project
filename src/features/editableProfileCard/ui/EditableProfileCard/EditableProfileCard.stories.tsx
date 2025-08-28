import { Profile } from '@/entities/Profile'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import avatar from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { ValidateProfileError } from '../../model/consts/editableProfileCardConsts'

import { EditableProfileCard } from './EditableProfileCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof EditableProfileCard> = {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof EditableProfileCard>

const profile: Profile = {
  id: '1',
  first: 'Ivan',
  lastname: 'Markelov',
  age: '26',
  country: Country.Russia,
  city: 'Saint-P',
  username: 'admin',
  currency: Currency.EUR,
  avatar
}

export const Primary: Story = {
  decorators: [
    StoreDecorator({
      profile: { initialData: profile, data: profile, readonly: true },
      user: { authData: { _id: '1' } }
    })
  ]
}

export const Readonly: Story = {
  decorators: [StoreDecorator({ profile: { data: profile, readonly: true } })]
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      profile: { isLoading: true, readonly: true }
    })
  ]
}

export const WithErrors: Story = {
  decorators: [
    StoreDecorator({
      profile: {
        data: {
          ...profile,
          first: undefined,
          city: undefined,
          avatar: 'test'
        },
        initialData: profile,
        readonly: false,
        validateErrors: [
          ValidateProfileError.INCORRECT_NAME,
          ValidateProfileError.INCORRECT_CITY,
          ValidateProfileError.INCORRECT_AVATAR
        ]
      },
      user: { authData: { _id: '1' } }
    })
  ]
}
