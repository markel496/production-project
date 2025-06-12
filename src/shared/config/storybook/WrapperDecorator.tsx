import { Decorator } from '@storybook/react'
import { CSSProperties } from 'react'

export const WrapperDecorator =
  (style: CSSProperties): Decorator =>
  (StoryComponent, { parameters }) =>
    !parameters?.withoutGlobalWrapper ? (
      <div style={style}>
        <StoryComponent />
      </div>
    ) : (
      <StoryComponent />
    )
