import type { Meta, StoryObj } from '@storybook/react'
import { Test } from './Test'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Test> = {
  title: 'features/Test',
  component: Test,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Test>

export const Primary: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}