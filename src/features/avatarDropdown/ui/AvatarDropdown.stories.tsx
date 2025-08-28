import { UserRole } from '@/entities/User'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import avatar from '@/shared/assets/tests/avatar.jpg'
import { WrapperDecorator } from '@/shared/config/storybook/WrapperDecorator'

import { AvatarDropdown } from './AvatarDropdown'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AvatarDropdown> = {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,

  decorators: [
    StoreDecorator({}),
    WrapperDecorator({
      height: 'var(--navbar-height)',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 20,
      background: 'var(--inverted-bg-color)'
    })
  ],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof AvatarDropdown>

export const Admin: Story = {
  args: {
    authData: {
      _id: '1',
      username: 'Vanya',
      roles: [UserRole.ADMIN]
    }
  }
}

export const User: Story = {
  args: {
    authData: {
      _id: '1',
      username: 'Vanya',
      roles: [UserRole.USER]
    }
  }
}

export const AdminWithAvatar: Story = {
  args: {
    authData: {
      _id: '1',
      username: 'Vanya',
      roles: [UserRole.ADMIN],
      avatar
    }
  }
}
