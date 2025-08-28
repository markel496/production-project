import { ThemeSwitcher } from './ThemeSwitcher'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Features/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ThemeSwitcher>

export const Primary: Story = {}
