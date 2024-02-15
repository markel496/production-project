import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Text } from '../Text/Text'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />
  }
}

export const Dark: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
