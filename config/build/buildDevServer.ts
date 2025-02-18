import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import { BuildOptions } from './types/config'

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port,
    open: true, //автоматически открывает приложение в браузере
    //проксирует запросы через корневую страницу index.html(для одностраничных приложений)
    historyApiFallback: true,
    hot: true
  }
}
