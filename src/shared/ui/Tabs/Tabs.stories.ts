import { action } from '@storybook/addon-actions'

import { Tabs } from './Tabs'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tabs> = {
  title: 'Shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: [
      { value: 'tab1', content: 'tab1' },
      { value: 'tab2', content: 'tab2' },
      { value: 'tab3', content: 'tab3' }
    ],
    value: 'tab2',
    onTabClick: action('onTabClick') //Позволяет увидеть какой коллбэк был вызван
  }
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Primary: Story = {}
