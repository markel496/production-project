import { Select } from './Select'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Select> = {
  title: 'Shared/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Select>

const options = [
  { value: 'example1', content: '1' },
  { value: 'example2', content: '2' },
  { value: 'example3', content: '3' },
  { value: 'example4', content: '4' }
]

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
    options
  }
}
