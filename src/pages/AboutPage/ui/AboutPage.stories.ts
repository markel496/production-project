import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import AboutPage from './AboutPage'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AboutPage> = {
  title: 'Pages/AboutPage',
  component: AboutPage,
  decorators: [
    StoreDecorator({
      scrollPosition: { scroll: {} }
    })
  ],
  parameters: {
    withoutGlobalWrapper: true
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof AboutPage>

export const Primary: Story = {}
