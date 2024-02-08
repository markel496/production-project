import type { Meta, StoryObj } from '@storybook/react'
import { EditCommentBtn } from './EditCommentBtn'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof EditCommentBtn> = {
  title: 'Features/EditComment/EditCommentButton',
  component: EditCommentBtn,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof EditCommentBtn>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}
