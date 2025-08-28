import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import MainPage from './MainPage'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MainPage> = {
  title: 'Pages/MainPage',
  component: MainPage,
  parameters: {
    withoutGlobalWrapper: true
  },
  decorators: [
    StoreDecorator({
      scrollPosition: { scroll: {} }
    })
  ],
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof MainPage>

export const Primary: Story = {}
