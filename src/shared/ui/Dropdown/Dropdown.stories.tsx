/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Button } from '../Button/Button'

const meta: Meta<typeof Dropdown> = {
  title: 'Shared/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  args: {
    trigger: <Button>Open</Button>,
    items: [
      {
        content: 'first',
        onClick: () => alert('Здарова заебал!')
      },
      {
        content: 'second',
        disabled: true
      },
      {
        content: 'third'
      }
    ]
  }
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.GREEN)]
}

export const BottomRight: Story = {
  args: {
    position: 'bottom right'
  },
  decorators: [
    (Story) => (
      <div style={{ paddingLeft: 40 }}>
        <Story />
      </div>
    )
  ]
}

export const TopRight: Story = {
  args: {
    position: 'top right'
  },
  decorators: [
    (Story) => (
      <div style={{ paddingLeft: 40, paddingTop: 135 }}>
        <Story />
      </div>
    )
  ]
}

export const TopLeft: Story = {
  args: {
    position: 'top left'
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 135 }}>
        <Story />
      </div>
    )
  ]
}
