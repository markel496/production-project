import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AvatarDropdown } from './AvatarDropdown'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { UserRole } from 'entities/User'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import avatar from 'shared/assets/tests/avatar.jpg'
import { WrapperDecorator } from 'shared/config/storybook/WrapperDecorator'

const meta: Meta<typeof AvatarDropdown> = {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [StoreDecorator({})],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof AvatarDropdown>

enum BackgroundColor {
  LIGHT = '#000036',
  DARK = '#dddcdc',
  GREEN = '#107c0a'
}

const BackgroundDecorator = (background: BackgroundColor): Decorator =>
  WrapperDecorator({
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    background
  })

export const PrimaryAdmin: Story = {
  args: {
    authData: {
      _id: '1',
      username: 'Vanya',
      roles: [UserRole.ADMIN]
    }
  },
  decorators: [BackgroundDecorator(BackgroundColor.LIGHT)]
}

export const DarkAdmin: Story = {
  args: {
    authData: {
      _id: '1',
      username: 'Vanya',
      roles: [UserRole.ADMIN]
    }
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    BackgroundDecorator(BackgroundColor.DARK)
  ]
}

export const GreenUser: Story = {
  args: {
    authData: {
      _id: '1',
      username: 'Vanya',
      roles: [UserRole.USER]
    }
  },
  decorators: [
    ThemeDecorator(Theme.GREEN),
    BackgroundDecorator(BackgroundColor.GREEN)
  ]
}

export const PrimaryAdminWithAvatar: Story = {
  args: {
    authData: {
      _id: '1',
      username: 'Vanya',
      roles: [UserRole.ADMIN],
      avatar
    }
  },
  decorators: [BackgroundDecorator(BackgroundColor.LIGHT)]
}
