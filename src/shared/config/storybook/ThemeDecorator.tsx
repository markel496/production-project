/* eslint-disable indent */
import { Decorator } from '@storybook/react'
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider'

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
