/* eslint-disable react/display-name */
/* eslint-disable indent */
import { Decorator } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'

export const ThemeDecorator =
  (theme: Theme): Decorator =>
  (StoryComponent) =>
    (
      <div className={`app ${theme}`}>
        <StoryComponent />
      </div>
    ) // StoryComponent()
