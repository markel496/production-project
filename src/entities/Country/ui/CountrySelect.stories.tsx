import type { Meta, StoryObj } from '@storybook/react'
import { CountrySelect } from './CountrySelect'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
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
  decorators: [WrapperDecorator({ paddingTop: 180 })],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CountrySelect>

export const Primary: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}
