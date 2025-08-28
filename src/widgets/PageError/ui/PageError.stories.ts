import { PageError } from './PageError'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PageError> = {
  title: 'Widgets/PageError',
  component: PageError,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof PageError>

export const Primary: Story = {}
