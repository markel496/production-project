import AddNewCommentForm from './AddNewCommentForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AddNewCommentForm> = {
  title: 'Entities/Comment/AddNewCommentForm',
  component: AddNewCommentForm,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof AddNewCommentForm>

export const Primary: Story = {}
