import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'

import { Country } from '../model/types/country'

import { CountrySelect } from './CountrySelect'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CountrySelect> = {
  title: 'Entities/CountrySelect',
  component: CountrySelect,

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
