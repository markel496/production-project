import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'

import { Notification } from '../../model/types/notification'

import { NotificationCard } from './NotificationCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NotificationCard> = {
  title: 'entities/Notification/NotificationCard',
  component: NotificationCard,

  decorators: [WrapperDecorator({ width: 500 })],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof NotificationCard>

const notification: Notification = {
  _id: '1',
  title: 'Уведомление 123',
  description: 'Какой-то текст',
  createdAt: '2024-11-09T15:01:32.493Z'
}

export const Primary: Story = {
  args: {
    notification
  }
}

export const WithLink: Story = {
  args: { notification: { ...notification, href: 'asdas' } }
}

export const WithoutDescription: Story = {
  args: { notification: { ...notification, description: undefined } }
}
