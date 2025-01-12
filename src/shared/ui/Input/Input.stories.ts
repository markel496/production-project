import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'padded'
  },
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
