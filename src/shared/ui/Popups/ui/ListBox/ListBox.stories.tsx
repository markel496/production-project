import type { Meta, StoryObj } from '@storybook/react'
import { ListBox } from './ListBox'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { Theme } from '@/app/providers/ThemeProvider'

const items = [
  { value: '1', content: 'Durward Reynolds' },
  { value: '2', content: 'Kenton Towne' },
  { value: '3', content: 'Therese Wunsch' },
  { value: '4', content: 'Benedict Kessler', disabled: true },
  { value: '5', content: 'Katelyn Rohan' }
]

const meta: Meta<typeof ListBox> = {
  title: 'Shared/Popups/ListBox',
  component: ListBox,
  parameters: {
    layout: 'padded'
  },
  args: {
    items,
    defaultValue: '5'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ListBox>

export const LightBottomRight: Story = {}

export const DarkBottomLeft: Story = {
  args: {
    position: 'bottom left'
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    WrapperDecorator({ paddingLeft: 60 })
  ]
}

export const LightTopRight: Story = {
  args: {
    position: 'top right'
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    WrapperDecorator({ paddingTop: 300 })
  ]
}

export const DarkTopLeft: Story = {
  args: {
    position: 'top left'
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    WrapperDecorator({ paddingLeft: 60, paddingTop: 300 })
  ]
}

export const LightWithLabel: Story = {
  args: {
    label: 'Выберите значение'
  }
}

export const GreenReadonly: Story = {
  args: {
    readonly: true
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
