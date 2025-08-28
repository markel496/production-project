import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { NotFoundPage } from './NotFoundPage'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NotFoundPage> = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
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
type Story = StoryObj<typeof NotFoundPage>

export const Primary: Story = {}
