import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Notification } from '../../model/types/notification'

import { NotificationCard } from './NotificationCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NotificationCard> = {
  title: 'entities/Notification/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'padded'
  },
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

export const Dark: Story = {
  args: { notification },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const DarkWithLink: Story = {
  args: { notification: { ...notification, href: 'asdas' } },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const DarkWithoutDescription: Story = {
  args: { notification: { ...notification, description: undefined } },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: { notification },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
