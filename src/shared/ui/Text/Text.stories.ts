import type { Meta, StoryObj } from '@storybook/react'
import { Text, TextSize, TextTheme } from './Text'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Text> = {
  title: 'Shared/Text',
  component: Text,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Text>

export const Primary: Story = {
  args: {
    title: 'Header',
    text: 'Some text...'
  }
}

export const OnlyTitle: Story = {
  args: {
    title: 'Header'
  }
}

export const OnlyText: Story = {
  args: {
    text: 'Some text...'
  }
}

export const PrimaryDark: Story = {
  args: {
    title: 'Header',
    text: 'Some text...'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const OnlyTitleDark: Story = {
  args: {
    title: 'Header'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const OnlyTextDark: Story = {
  args: {
    text: 'Some text...'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Error: Story = {
  args: {
    title: 'Header',
    text: 'Some text...',
    theme: TextTheme.ERROR
  }
}

export const ErrorDark: Story = {
  args: {
    title: 'Header',
    text: 'Some text...',
    theme: TextTheme.ERROR
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Size_L: Story = {
  args: {
    title: 'Header',
    text: 'Some text...',
    size: TextSize.L
  }
}
