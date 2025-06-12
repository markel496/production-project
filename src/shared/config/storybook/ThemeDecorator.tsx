import { Decorator } from '@storybook/react'

// eslint-disable-next-line markel-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Theme } from '@/shared/const/theme'

export const ThemeDecorator =
  (theme: Theme): Decorator =>
  (StoryComponent) => (
    <ThemeProvider initialTheme={theme}>
      {theme === Theme.LIGHT ? (
        <div className="app">
          <StoryComponent />
        </div>
      ) : (
        <StoryComponent />
      )}
    </ThemeProvider>
  ) // StoryComponent()
