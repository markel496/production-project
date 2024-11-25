/* eslint-disable indent */
import { Decorator } from '@storybook/react'
import { CSSProperties } from 'react'

export const WrapperDecorator =
  (style: CSSProperties): Decorator =>
  (StoryComponent) => (
    <div style={style}>
      <StoryComponent />
    </div>
  )
