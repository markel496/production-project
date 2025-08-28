import HuskyIcon from '@/shared/assets/tests/husky.svg'

import { Icon } from './Icon'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Icon> = {
  title: 'Shared/Icon',
  component: Icon,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Icon>

export const Primary: Story = {
  args: {
    Svg: HuskyIcon,
    width: 100,
    height: 100
  }
}
