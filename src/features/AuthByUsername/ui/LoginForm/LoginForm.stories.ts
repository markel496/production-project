import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'

import LoginForm from './LoginForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoginForm> = {
  title: 'Features/LoginForm',
  component: LoginForm,
  decorators: [
    WrapperDecorator({
      width: '100%',
      minWidth: 'var(--modal-min-width)',
      maxWidth: 'var(--modal-max-width)',
      padding: 20,
      border: '1px solid var(--primary-color)',
      borderRadius: 12
    })
  ],
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Primary: Story = {}

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
