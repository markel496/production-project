import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { AppLink, AppLinkTheme } from './AppLink'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AppLink> = {
  title: 'Shared/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  args: {
    to: '/'
  }
}

export default meta
type Story = StoryObj<typeof AppLink>

export const Primary: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.PRIMARY
  }
}

export const Inverted: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.INVERTED
  }
}

export const PrimaryDark: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.PRIMARY
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const InvertedDark: Story = {
  args: {
    children: 'Text',
    theme: AppLinkTheme.INVERTED
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
