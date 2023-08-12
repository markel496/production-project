import { BuildOptions } from './types/config'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true, //автоматически открывает приложение в браузере
    //проксирует запросы через корневую страницу index.html(для одностраничных приложений)
    historyApiFallback: true
  }
}
