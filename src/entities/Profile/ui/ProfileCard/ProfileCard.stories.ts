import avatar from '@/shared/assets/tests/avatar.jpg'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

import { Profile } from '../../model/types/profile'

import { ProfileCard } from './ProfileCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProfileCard> = {
  title: 'Entities/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ProfileCard>

const data: Profile = {
  first: 'Ivan',
  lastname: 'Markelov',
  age: '26',
  country: Country.Russia,
  city: 'Saint-P',
  username: 'admin',
  currency: Currency.EUR,
  avatar
  // 'https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg'
}

export const Primary: Story = {
  args: {
    data
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}

export const Error: Story = {
  args: {
    error: 'error'
  }
}
