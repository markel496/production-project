/* eslint-disable indent */
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface buildBabelLoaderProps {
  isTsx: boolean
  isDev: boolean
}

export const buildBabelLoader = ({ isTsx, isDev }: buildBabelLoaderProps) => {
  const isProd = !isDev
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        // presets: ['@babel/preset-env'],

        /** Кэш для babel loader, за счет кэшей рибилд будет быстрее, тк часть кода он не будет генерировать заново, а возьмет из кэша*/
        cacheDirectory: true,
        plugins: [
          [
            '@babel/plugin-transform-typescript',
            {
              isTsx
            }
          ],
          isDev && require.resolve('react-refresh/babel'),
          '@babel/plugin-transform-runtime',
          isTsx &&
            isProd && [
              babelRemovePropsPlugin,
              {
                props: ['data-testid']
              }
            ]
        ].filter(Boolean) // Чтобы в массиве plugins не было false, когда isTsx или isDev = false
      }
    }
  }
}
