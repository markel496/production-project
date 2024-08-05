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
    defaultValue: '5'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ListBox>

export const LightBottomLeft: Story = {}

export const DarkBottomRight: Story = {
  args: {
    position: 'bottom right'
  },
  decorators: [
    (Story) => (
      <div style={{ paddingLeft: 60 }}>
        <Story />
      </div>
    ),
    ThemeDecorator(Theme.DARK)
  ]
}

export const LightTopLeft: Story = {
  args: {
    position: 'top left'
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 300 }}>
        <Story />
      </div>
    ),
    ThemeDecorator(Theme.DARK)
  ]
}

export const DarkTopRight: Story = {
  args: {
    position: 'top right'
  },
  decorators: [
    (Story) => (
      <div style={{ paddingLeft: 60, paddingTop: 300 }}>
        <Story />
      </div>
    ),
    ThemeDecorator(Theme.DARK)
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
