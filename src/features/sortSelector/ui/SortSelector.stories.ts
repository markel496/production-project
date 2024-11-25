import type { Meta, StoryObj } from '@storybook/react'
import { SortSelector } from './SortSelector'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof SortSelector> = {
  title: 'Features/SortSelector',
  component: SortSelector,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof SortSelector>

export const Primary: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}