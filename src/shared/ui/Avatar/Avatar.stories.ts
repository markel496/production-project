import AvatarImg from '@/shared/assets/tests/avatar.jpg'

import { Avatar } from './Avatar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  args: {
    src: AvatarImg,
    size: 150
  }
}

export const Small: Story = {
  args: {
    src: AvatarImg,
    size: 50
  }
}
