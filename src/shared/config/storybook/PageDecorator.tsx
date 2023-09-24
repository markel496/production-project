import { Decorator } from '@storybook/react'

export const PageDecorator: Decorator = (StoryComponent) => (
  <div className="page-wrapper">
    <StoryComponent />
  </div>
)
