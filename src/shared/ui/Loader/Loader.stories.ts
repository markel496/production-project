import { Loader } from './Loader'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Loader> = {
  title: 'Shared/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Loader>

export const Primary: Story = {}
