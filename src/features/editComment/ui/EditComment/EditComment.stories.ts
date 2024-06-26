import type { Meta, StoryObj } from '@storybook/react'
import { EditComment } from './EditComment'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Comment } from 'entities/Comment'

const meta: Meta<typeof EditComment> = {
  title: 'Features/EditComment/EditComment',
  component: EditComment,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof EditComment>

const comment: Comment = {
  _id: '1',
  user: {
    _id: '1',
    username: 'Commentator',
    avatar:
      'https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg'
  },
  text: 'HOLLA420',
  createdAt: '2024-06-06T17:35:45.931Z',
  updatedAt: '2024-06-06T17:35:45.931Z'
}

export const Primary: Story = {
  args: { comment }
}

export const Dark: Story = {
  args: { comment },
  decorators: [ThemeDecorator(Theme.DARK)]
}
