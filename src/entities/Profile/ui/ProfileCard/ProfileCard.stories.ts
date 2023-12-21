import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import avatar from 'shared/assets/tests/avatar.jpg'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Profile } from '../../model/types/profile'

const meta: Meta<typeof ProfileCard> = {
  title: 'Entities/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'padded'
  },
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

export const Dark: Story = {
  args: {
    data
  },
  decorators: [ThemeDecorator(Theme.DARK)]
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
