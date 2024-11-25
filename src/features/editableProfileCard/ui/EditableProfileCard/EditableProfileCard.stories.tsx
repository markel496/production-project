import type { Meta, StoryObj } from '@storybook/react'
import { EditableProfileCard } from './EditableProfileCard'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Profile } from 'entities/Profile'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import avatar from 'shared/assets/tests/avatar.jpg'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import { ValidateProfileError } from '../../model/consts/editableProfileCardConsts'

const meta: Meta<typeof EditableProfileCard> = {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  parameters: {
    layout: 'padded'
  },
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

export const PrimaryOnlyReadonly: Story = {
  decorators: [StoreDecorator({ profile: { data: profile, readonly: true } })]
}

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      profile: { data: profile, initialData: profile, readonly: true },
      user: { authData: { _id: '1' } }
    })
  ]
}

export const Green: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({
      profile: { data: profile, initialData: profile, readonly: true },
      user: { authData: { _id: '1' } }
    })
  ]
}

export const Loading: Story = {
  decorators: [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
      profile: { isLoading: true, readonly: true }
    })
  ]
}
export const LoadingDark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      profile: { isLoading: true, readonly: true }
    })
  ]
}
export const LoadingGreen: Story = {
  decorators: [
    ThemeDecorator(Theme.GREEN),
    StoreDecorator({
      profile: { isLoading: true, readonly: true }
    })
  ]
}

export const WithErrors: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
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
