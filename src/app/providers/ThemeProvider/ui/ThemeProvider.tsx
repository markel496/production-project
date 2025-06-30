import { ReactNode, useEffect, useMemo, useState } from 'react'

import { Theme } from '@/shared/const/theme'
import { ThemeContext } from '@/shared/lib/context/themeContext'
import { useGetUserSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

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
  const { theme: userTheme } = useGetUserSettings()
  const [theme, setTheme] = useState<Theme>(
    initialTheme || userTheme || Theme.LIGHT
  )
  const dispatch = useAppDispatch()

  document.body.className = `${theme} ${getInitialBodyClasses()}`

  //useMemo - для того, чтобы при рендере компонента объект({ theme, setTheme }) заново не инициализировался. Без useMemo объект каждый раз будет новый, ссылка на него новая, компонент будет перерисовываться
  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  useEffect(() => {
    if (userTheme) {
      setTheme(userTheme)
    }
  }, [userTheme, dispatch])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
