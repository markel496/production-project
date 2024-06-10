import { Decorator } from '@storybook/react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const RouterDecorator: Decorator = (StoryComponent) => (
  <BrowserRouter>
    <Suspense fallback={'Loading...'}>
      <StoryComponent />
    </Suspense>
  </BrowserRouter>
)
