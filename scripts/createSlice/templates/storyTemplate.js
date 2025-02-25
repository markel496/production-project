module.exports = (layer, componentName) =>
  `import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${componentName}'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof ${componentName}> = {
  title: '${layer}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ${componentName}>

export const Primary: Story = {}

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)]
}`.replace(/\n/g, '\r\n')
