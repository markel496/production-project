/* eslint-disable quotes */
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Code } from './Code'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Code> = {
  title: 'Shared/Code',
  component: Code,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Code>

const text =
  'export default {\n' +
  "    title: 'shared/Code',\n" +
  '    component: Code,\n' +
  '    argTypes: {\n' +
  "        backgroundColor: { control: 'color' },\n" +
  '    },\n' +
  '} as ComponentMeta<typeof Code>;\n' +
  '\n' +
  'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n' +
  '\n' +
  'export const Normal = Template.bind({});'

export const Primary: Story = {
  args: {
    text
  }
}

export const Dark: Story = {
  args: {
    text
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Green: Story = {
  args: {
    text
  },
  decorators: [ThemeDecorator(Theme.GREEN)]
}
