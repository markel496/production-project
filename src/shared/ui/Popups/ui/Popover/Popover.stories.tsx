import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'

import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'

import { Icon } from '../../../Icon/Icon'
import { Text } from '../../../Text/Text'
import { VStack } from '../../../Stack'

import { Popover } from './Popover'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Popover> = {
  title: 'Shared/Popups/Popover',
  component: Popover,
  args: {
    trigger: <Icon Svg={NotificationIcon} inverted width={30} height={30} />,
    children: (
      <VStack style={{ width: 300 }} gap="10">
        <Text text="Какой-то текст для сторибука" />
        <Text title="Заголовок" text="Какой-то текст для сторибука" />
        <Text title="Заголовок" text="Какой-то текст для сторибука" />
        <Text text="Какой-то текст для сторибука" />
        <Text title="Заголовок" text="Какой-то текст для сторибука" />
        <Text text="Какой-то текст для сторибука" />
        <Text text="Какой-то текст для сторибука" />
      </VStack>
    )
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Popover>

export const Primary: Story = {}

export const BottomLeft: Story = {
  args: {
    position: 'bottom left'
  },
  decorators: [WrapperDecorator({ marginLeft: 320 })]
}

export const TopLeft: Story = {
  args: {
    position: 'top left'
  },
  decorators: [WrapperDecorator({ marginLeft: 320, paddingTop: 370 })]
}

export const TopRight: Story = {
  args: {
    position: 'top right'
  },
  decorators: [WrapperDecorator({ paddingTop: 370 })]
}
