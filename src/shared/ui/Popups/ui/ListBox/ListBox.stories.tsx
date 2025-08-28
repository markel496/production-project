import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'

import { ListBox } from './ListBox'

import type { Meta, StoryObj } from '@storybook/react'

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

  args: {
    items,
    defaultValue: '5'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ListBox>

export const BottomRight: Story = {}

export const BottomLeft: Story = {
  args: {
    position: 'bottom left'
  },
  decorators: [WrapperDecorator({ paddingLeft: 60 })]
}

export const TopRight: Story = {
  args: {
    position: 'top right'
  },
  decorators: [WrapperDecorator({ paddingTop: 300 })]
}

export const TopLeft: Story = {
  args: {
    position: 'top left'
  },
  decorators: [WrapperDecorator({ paddingLeft: 60, paddingTop: 300 })]
}

export const WithLabel: Story = {
  args: {
    label: 'Выберите значение'
  }
}

export const Readonly: Story = {
  args: {
    readonly: true
  }
}
