import type { Meta, StoryObj } from '@storybook/react'
import LoginForm from './LoginForm'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

const meta: Meta<typeof LoginForm> = {
  title: 'Features/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'padded'
  },
  decorators: [ThemeDecorator(Theme.DARK)],
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Light: Story = {
  args: {},
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)]
}

export const Dark: Story = {
  args: {},
  decorators: [StoreDecorator({})]
}

export const Green: Story = {
  args: {},
  decorators: [StoreDecorator({}), ThemeDecorator(Theme.GREEN)]
}

export const WithError: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      loginForm: {
        error: 'Some Error...'
      }
    })
  ]
}

export const WithLoading: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      loginForm: {
        isLoading: true
      }
    })
  ]
}
