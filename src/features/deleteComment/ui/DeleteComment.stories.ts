import type { Meta, StoryObj } from '@storybook/react'
import { DeleteComment } from './DeleteComment'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof DeleteComment> = {
  title: 'Features/DeleteComment',
  component: DeleteComment,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof DeleteComment>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}
