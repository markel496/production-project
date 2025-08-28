import { Modal } from './Modal'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Modal>

const children =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis doloremque architecto ut eius! Maxime, id.'

export const Primary: Story = {
  args: {
    isOpen: true,
    children
  }
}
