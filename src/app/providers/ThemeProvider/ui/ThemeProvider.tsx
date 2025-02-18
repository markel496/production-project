import { ReactNode, useMemo, useState } from 'react'

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage'
import { Theme } from '@/shared/const/theme'
import { ThemeContext } from '@/shared/lib/context/themeContext'

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

const getInitialBodyClasses = () => {
  if (__PROJECT__ !== 'storybook') return ''
  return [...document.body.classList]
    .filter((cls) => !cls.includes('_theme'))
    .join(' ')
}

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

const ThemeProvider = (props: ThemeProviderProps) => {
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
