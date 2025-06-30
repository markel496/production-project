import { memo, useCallback } from 'react'

import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import { Theme } from '@/shared/const/theme'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { saveUserSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()
  const dispatch = useAppDispatch()

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme: Theme) => {
      dispatch(saveUserSettings({ theme: newTheme }))
    })
  }, [toggleTheme, dispatch])

  return (
    <Button
      className={className}
      theme={ButtonTheme.CLEAR}
      onClick={onToggleHandler}
    >
      {theme === Theme.LIGHT ? (
        <DarkIcon width={40} height={40} />
      ) : (
        <LightIcon width={40} height={40} />
      )}
    </Button>
  )
})
