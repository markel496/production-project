import ThemeProvider from './ui/ThemeProvider'
import { useTheme } from './lib/useTheme'
import { Theme } from './lib/themeContext'

export { ThemeProvider, useTheme, Theme }

/**Внутри самого модуля рекомендуется использовать относительные пути (если перенесем модуль - пути никак не поменяются). Когда экспортируем наружу - используем абсолютные импорты до index.ts файла */
