import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Currency } from '../model/types/currency'

import { CurrencySelect } from './CurrencySelect'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CurrencySelect> = {
  title: 'Entities/CurrencySelect',
  component: CurrencySelect,
  parameters: {
    layout: 'padded'
  },
  args: {
    value: Currency.USD
  },
  decorators: [WrapperDecorator({ paddingTop: 180 })],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CurrencySelect>

export const Primary: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}
