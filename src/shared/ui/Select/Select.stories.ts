import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Select> = {
  title: 'Shared/Select',
  component: Select,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Select>

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { value: 'example1', content: '1' },
      { value: 'example2', content: '2' },
      { value: 'example3', content: '3' },
      { value: 'example4', content: '4' }
    ]
  }
}

export const Dark: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { value: 'example1', content: '1' },
      { value: 'example2', content: '2' },
      { value: 'example3', content: '3' },
      { value: 'example4', content: '4' }
    ]
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
