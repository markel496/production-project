import { initialize } from 'msw-storybook-addon'
import type { Preview } from '@storybook/react'
import '../../src/app/styles/index.scss'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator'
import { Theme } from '../../src/app/providers/ThemeProvider/lib/themeContext'

// Initialize MSW
initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },

  decorators: [ThemeDecorator(Theme.LIGHT), RouterDecorator]
}

export default preview
