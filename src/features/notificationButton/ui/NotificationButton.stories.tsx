import { mswLoader } from 'msw-storybook-addon'

import { http, HttpResponse, delay } from 'msw'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { Notification } from '@/entities/Notification'

import { NotificationButton } from './NotificationButton'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NotificationButton> = {
  title: 'features/NotificationButton',
  component: NotificationButton,
  decorators: [
    StoreDecorator({
      user: { authData: { _id: '1234' } }
    }),
    WrapperDecorator({
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 50,
      background: 'var(--inverted-bg-color)'
    })
  ],
  loaders: [mswLoader],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof NotificationButton>

const notification: Notification = {
  _id: '1',
  title: 'Уведомление 123',
  description: 'Какой-то текст',
  createdAt: '2024-11-09T15:01:32.493Z'
}

const notifications = [...new Array(12)].map((_, idx) => {
  return { ...notification, _id: String(idx) }
})

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/notifications/1234', () => {
          return HttpResponse.json(notifications)
        })
      ]
    }
  }
}

//===============================================================================================

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/notifications/1234', () => {
          return delay('infinite')
        })
      ]
    }
  }
}

//===============================================================================================

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/notifications/1234', () => {
          return new HttpResponse(null, {
            status: 403
          })
        })
      ]
    }
  }
}

//===============================================================================================

export const NoData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/notifications/1234', () => {
          return HttpResponse.json([])
        })
      ]
    }
  }
}
