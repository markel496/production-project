import { AuthHelpButton } from './AuthHelpButton'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AuthHelpButton> = {
  title: 'Features/AuthHelpButton/AuthHelpButton',
  component: AuthHelpButton,
  tags: ['autodocs'],

  argTypes: {}
}

export default meta
type Story = StoryObj<typeof AuthHelpButton>

export const Primary: Story = {}
