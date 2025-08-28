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
