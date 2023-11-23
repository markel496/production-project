import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'
import AvatarImg from './for_storybook.jpg'

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
