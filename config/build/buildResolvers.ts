import { ResolveOptions } from 'webpack'
import { BuildOptions } from './types/config'

export function buildResolvers({ paths }: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true, //абсолютные пути в приоритете
    alias: {
      '@': paths.src
    },
    mainFiles: ['index'],
    modules: [paths.src, 'node_modules']
  }
}
