import { useContext } from 'react'

import { Theme } from '@/shared/const/theme'

import { ThemeContext } from '../../context/themeContext'

interface useThemeResult {
  theme: Theme
  /** Место куда сохранять тему определяется не внутри хука, а извне */
  toggleTheme: (saveAction?: (theme: Theme) => void) => void
}

export function useTheme(): useThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme

    switch (theme) {
      case Theme.LIGHT:
        newTheme = Theme.DARK
        break

      case Theme.DARK:
        newTheme = Theme.GREEN
        break

      case Theme.GREEN:
        newTheme = Theme.LIGHT
        break

      default:
        newTheme = Theme.LIGHT
    }

    setTheme?.(newTheme)
    saveAction?.(newTheme)
    document.body.className = newTheme
  }

  return { theme: theme || Theme.LIGHT, toggleTheme }
}
