import { List } from './List'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof List> = {
  title: 'Shared/List',
  component: List,

  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof List>

const list = ['some text...', 'some text 2...', 'some text 3...']

export const Primary: Story = {
  args: {
    list
  }
}

export const WithBullet: Story = {
  args: {
    list,
    bullet: '✓'
  }
}

export const WithSecondList: Story = {
  args: {
    list: [...list, <List key={'test'} list={list} bullet="▪" />],
    bullet: '✓'
  }
}
