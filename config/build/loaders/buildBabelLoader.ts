import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface buildBabelLoaderProps {
  isTsx: boolean
  isDev: boolean
}

export const buildBabelLoader = ({ isTsx, isDev }: buildBabelLoaderProps) => ({
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      // presets: ['@babel/preset-env'],
      plugins: [
        [
          '@babel/plugin-transform-typescript',
          {
            isTsx
          }
        ],
        isDev && require.resolve('react-refresh/babel'),
        '@babel/plugin-transform-runtime',
        isTsx && [
          babelRemovePropsPlugin,
          {
            props: ['data-testid']
          }
        ]
      ].filter(Boolean) // Чтобы в массиве plugins не было false, когда isTsx или isDev = false
    }
  }
})
