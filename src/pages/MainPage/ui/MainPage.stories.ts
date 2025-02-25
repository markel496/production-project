import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
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

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  decorators: [ThemeDecorator(Theme.GREEN)]
}
