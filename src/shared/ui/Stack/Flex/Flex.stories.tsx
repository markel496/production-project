import { Flex } from './Flex'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Flex> = {
  title: 'Shared/Flex',
  component: Flex,
  parameters: {
    layout: 'padded'
  },
  args: {
    children: (
      <>
        <div>Some text...</div>
        <div>Some text...</div>
        <div>Some text...</div>
      </>
    )
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Flex>

export const FlexStart: Story = {}

export const FlexCenter: Story = {
  args: {
    justify: 'center'
  }
}

export const FlexEnd: Story = {
  args: {
    justify: 'end'
  }
}

export const DirectionColumn: Story = {
  args: {
    direction: 'column',
    align: 'start'
  }
}

export const Gap20: Story = {
  args: {
    gap: '20'
  }
}

export const ColumnGap20: Story = {
  args: {
    direction: 'column',
    align: 'start',
    gap: '20'
  }
}
