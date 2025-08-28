import { Input } from './Input'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Input>

export const Primary: Story = {
  args: {
    placeholder: 'Введите текст',
    autoFocus: true
  }
}

export const Readonly: Story = {
  args: {
    placeholder: 'Введите текст',
    readonly: true,
    value: 'Какой-то текст'
  }
}
