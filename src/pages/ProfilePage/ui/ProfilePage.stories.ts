import type { Meta, StoryObj } from '@storybook/react'
import ProfilePage from './ProfilePage'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { Profile } from 'entities/Profile'
import avatar from 'shared/assets/tests/avatar.jpg'

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ProfilePage>

const profile: Profile = {
  first: 'Ivan',
  lastname: 'Markelov',
  age: '26',
  country: Country.Russia,
  city: 'Saint-P',
  username: 'admin',
  currency: Currency.EUR,
  avatar
}

export const Light: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      profile: {
        data: profile,
        initialData: { id: '1', ...profile },
        readonly: true
      },
      user: { authData: { _id: '1' } }
    })
  ]
}

export const Dark: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      profile: {
        data: profile,
        readonly: true
      }
    }),
    ThemeDecorator(Theme.DARK)
  ]
}

export const Loading: Story = {
  args: {},
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
  args: {},
  decorators: [
    StoreDecorator({
      profile: {
        error: 'error'
      }
    })
  ]
}
