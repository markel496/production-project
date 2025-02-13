/* eslint-disable indent */
import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { NotificationButton } from './NotificationButton'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { mswLoader } from 'msw-storybook-addon'
import { Notification } from '@/entities/Notification'
import { http, HttpResponse, delay } from 'msw'

const meta: Meta<typeof NotificationButton> = {
  title: 'features/NotificationButton',
  component: NotificationButton,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    size: 20
  },
  decorators: [
    StoreDecorator({
      user: { authData: { _id: '1234' } }
    })
  ],
  loaders: [mswLoader],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof NotificationButton>

enum BackgroundColor {
  LIGHT = '#000036',
  DARK = '#dddcdc',
  GREEN = '#107c0a'
}

const BackgroundDecorator = (background: BackgroundColor): Decorator =>
  WrapperDecorator({
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 50,
    background
  })

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
  decorators: [BackgroundDecorator(BackgroundColor.LIGHT)],
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
  decorators: [
    ThemeDecorator(Theme.DARK),
    BackgroundDecorator(BackgroundColor.DARK)
  ],
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
  decorators: [
    ThemeDecorator(Theme.GREEN),
    BackgroundDecorator(BackgroundColor.GREEN)
  ],
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
  decorators: [BackgroundDecorator(BackgroundColor.LIGHT)],
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
  decorators: [
    ThemeDecorator(Theme.DARK),
    BackgroundDecorator(BackgroundColor.DARK)
  ],
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
  decorators: [
    ThemeDecorator(Theme.GREEN),
    BackgroundDecorator(BackgroundColor.GREEN)
  ],
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
  decorators: [BackgroundDecorator(BackgroundColor.LIGHT)],
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
  decorators: [
    ThemeDecorator(Theme.DARK),
    BackgroundDecorator(BackgroundColor.DARK)
  ],
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
