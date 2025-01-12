import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Modal>

const children =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis doloremque architecto ut eius! Maxime, id.'

export const Light: Story = {
  args: {
    isOpen: true,
    children
  }
}

export const Dark: Story = {
  args: {
    isOpen: true,
    children
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {
    isOpen: true,
    children
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
