import { Text } from '../Text/Text'

import { Card, CardTheme } from './Card'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />
  }
}

export const Outline: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />,
    theme: CardTheme.OUTLINE
  }
}
