import type { StorybookConfig } from '@storybook/react-webpack5'
import webpack from 'webpack'
import { BuildPaths } from '../build/types/config'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async webpackFinal(config: webpack.Configuration) {
    const src: BuildPaths['src'] = path.resolve(__dirname, '..', '..', 'src')
    config.resolve?.modules?.push(src)

    if (config.module?.rules) {
      config.module.rules = config.module.rules.map((rule) => {
        if (rule !== '...') {
          if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i }
          }
        }

        return rule
      })

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      })
      config.module.rules.push(buildCssLoader(true))
    }
    return config
  }
}
export default config
