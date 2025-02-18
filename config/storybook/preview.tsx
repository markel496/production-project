import { initialize } from 'msw-storybook-addon'

import '../../src/app/styles/index.scss'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator'
import { Theme } from '../../src/shared/const/theme'

import type { Preview } from '@storybook/react'

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
