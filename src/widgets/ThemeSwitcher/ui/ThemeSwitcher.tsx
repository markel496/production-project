import { Theme, useTheme } from '@/app/providers/ThemeProvider'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { memo } from 'react'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      className={className}
      theme={ButtonTheme.CLEAR}
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? <DarkIcon /> : <LightIcon />}
    </Button>
  )
})
