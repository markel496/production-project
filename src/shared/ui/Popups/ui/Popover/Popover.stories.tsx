/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { Icon } from '../../../Icon/Icon'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { Text } from '../../../Text/Text'
import { VStack } from '../../../Stack'
import cls from './Popover.module.scss'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { Button } from '../../../../ui/Button/Button'

const meta: Meta<typeof Popover> = {
  title: 'Shared/Popups/Popover',
  component: Popover,
  args: {
    trigger: <Icon Svg={NotificationIcon} inverted />,
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
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Popover>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}

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
