import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Text } from '../Text/Text'

import { Card, CardTheme } from './Card'

import type { Meta, StoryObj } from '@storybook/react'

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

export const Outline: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />,
    theme: CardTheme.OUTLINE
  }
}

//===============================================================================================

export const Dark: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const OutlineDark: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />,
    theme: CardTheme.OUTLINE
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

//===============================================================================================

export const Green: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const OutlineGreen: Story = {
  args: {
    children: <Text title="TEST" text="Some text" />,
    theme: CardTheme.OUTLINE
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
