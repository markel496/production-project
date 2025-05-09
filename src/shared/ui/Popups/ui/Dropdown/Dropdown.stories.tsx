/* eslint-disable i18next/no-literal-string */
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { Theme } from '@/shared/const/theme'

import { Button } from '../../../Button/Button'

import { Dropdown } from './Dropdown'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dropdown> = {
  title: 'Shared/Popups/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    trigger: <Button>Open</Button>,
    items: [
      {
        content: 'first',
        onClick: () => alert('Здарова заебал!')
      },
      {
        content: 'second',
        disabled: true
      },
      {
        content: 'third'
      }
    ]
  }
}

export default meta
type Story = StoryObj<typeof Dropdown>

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
  decorators: [WrapperDecorator({ paddingLeft: 40 })]
}

export const TopLeft: Story = {
  args: {
    position: 'top left'
  },
  decorators: [WrapperDecorator({ paddingLeft: 40, paddingTop: 140 })]
}

export const TopRight: Story = {
  args: {
    position: 'top right'
  },
  decorators: [WrapperDecorator({ paddingTop: 140 })]
}
