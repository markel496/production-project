import { initialize } from 'msw-storybook-addon'

import '../../src/app/styles/index.scss'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'
import { WrapperDecorator } from '../../src/shared/config/storybook/WrapperDecorator'
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
    },
    layout: 'fullscreen',
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: [Theme.LIGHT], color: '#dddcdc' },
        { name: 'dark', class: [Theme.DARK], color: '#000036' },
        { name: 'green', class: [Theme.GREEN], color: '#15c90b' }
      ]
    }
  },

  decorators: [
    WrapperDecorator({ padding: 20 }),
    ThemeDecorator(Theme.LIGHT),
    RouterDecorator
  ]
}

export default preview
