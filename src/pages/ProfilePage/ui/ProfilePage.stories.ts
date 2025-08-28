import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '@/entities/Profile'
import avatar from '@/shared/assets/tests/avatar.jpg'

import ProfilePage from './ProfilePage'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    withoutGlobalWrapper: true
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ProfilePage>

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
      profile: {
        data: profile,
        initialData: profile,
        readonly: true
      },
      user: { authData: { _id: '1' } }
    })
  ]
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      profile: {
        isLoading: true,
        readonly: true
      }
    })
  ]
}

export const Error: Story = {
  decorators: [
    StoreDecorator({
      profile: {
        error: 'error'
      }
    })
  ]
}
