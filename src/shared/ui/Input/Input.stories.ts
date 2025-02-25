import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Input } from './Input'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Input>

export const Light: Story = {
  args: {
    placeholder: 'Введите текст',
    autoFocus: true
  }
}

export const Dark: Story = {
  args: {
    placeholder: 'Введите текст',
    autoFocus: true
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {
    placeholder: 'Введите текст',
    autoFocus: true
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
