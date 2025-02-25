import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import LoginForm from './LoginForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoginForm> = {
  title: 'Features/LoginForm',
  component: LoginForm,

  decorators: [ThemeDecorator(Theme.DARK)],
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Light: Story = {
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)]
}

export const Dark: Story = {
  decorators: [StoreDecorator({})]
}

export const Green: Story = {
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.GREEN)]
}

export const WithError: Story = {
  decorators: [
    StoreDecorator({
      loginForm: {
        error: 'Some Error...'
      }
    })
  ]
}

export const WithLoading: Story = {
  decorators: [
    StoreDecorator({
      loginForm: {
        isLoading: true
      }
    })
  ]
}
