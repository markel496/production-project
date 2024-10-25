import type { Meta, StoryObj } from '@storybook/react'
import { CurrencySelect } from './CurrencySelect'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Currency } from '../model/types/currency'

const meta: Meta<typeof CurrencySelect> = {
  title: 'Entities/CurrencySelect',
  component: CurrencySelect,
  parameters: {
    layout: 'padded'
  },
  args: {
    value: Currency.USD
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 180 }}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CurrencySelect>

export const Primary: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.GREEN)]
}
