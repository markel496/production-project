import type { Meta, StoryObj } from '@storybook/react'
import { ListBox } from './ListBox'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const items = [
  { value: '1', content: 'Durward Reynolds' },
  { value: '2', content: 'Kenton Towne' },
  { value: '3', content: 'Therese Wunsch' },
  { value: '4', content: 'Benedict Kessler', disabled: true },
  { value: '5', content: 'Katelyn Rohan' }
]

const meta: Meta<typeof ListBox> = {
  title: 'Shared/ListBox',
  component: ListBox,
  parameters: {
    layout: 'padded'
  },
  args: {
    items,
    defaultValue: 'Выберите значение'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ListBox>

export const Light: Story = {}

export const Dark: Story = {
  args: {
    value: items[3].content
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {
    readonly: true
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
