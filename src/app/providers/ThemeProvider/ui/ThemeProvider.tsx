import { FC, ReactNode, useMemo, useState } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext
} from '../lib/themeContext'
import { getInitialBodyClasses } from '../lib/getInitialBodyClasses'

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children, initialTheme } = props
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

  document.body.className = `${theme} ${getInitialBodyClasses()}`

  //useMemo - для того, чтобы при рендере компонента объект({ theme, setTheme }) заново не инициализировался. Без useMemo объект каждый раз будет новый, ссылка на него новая, компонент будет перерисовываться
  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
