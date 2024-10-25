import type { Meta, StoryObj } from '@storybook/react'
import { CountrySelect } from './CountrySelect'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Country } from '../model/types/country'

const meta: Meta<typeof CountrySelect> = {
  title: 'Entities/CountrySelect',
  component: CountrySelect,
  parameters: {
    layout: 'padded'
  },
  args: {
    value: Country.Kazakhstan
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
type Story = StoryObj<typeof CountrySelect>

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
