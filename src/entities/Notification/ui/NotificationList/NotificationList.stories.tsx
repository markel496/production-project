import type { Meta, StoryObj } from '@storybook/react'
import { NotificationList } from './NotificationList'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Notification } from '../../model/types/notification'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { mswLoader } from 'msw-storybook-addon'
import { http, HttpResponse, delay } from 'msw'

const meta: Meta<typeof NotificationList> = {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  decorators: [
    StoreDecorator({
      user: { authData: { _id: '1234' } }
    }),
    WrapperDecorator({ width: 500, height: 400, overflowY: 'auto' })
  ],
  parameters: {
    layout: 'padded'
  },
  loaders: [mswLoader],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof NotificationList>

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

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
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

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)],
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

export const LoadingDark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
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

export const LoadingGreen: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)],
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
