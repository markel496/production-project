import { useContext } from 'react'

import { Theme } from '@/shared/const/theme'

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage'

import { ThemeContext } from '../../context/themeContext'

interface useThemeResult {
  theme: Theme
  toggleTheme: () => void
}

export function useTheme(): useThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
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
    document.body.className = newTheme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return { theme: theme || Theme.LIGHT, toggleTheme }
}
