import { StateSchema } from 'app/providers/StoreProvider'

export const getScrollPosition = (state: StateSchema) =>
  state.scrollPosition.scroll

export const getScrollPositionByPath = (path: string) => (state: StateSchema) =>
  state.scrollPosition.scroll[path]

// export const getScrollPositionByPath = createSelector(
//   getScrollPosition,
//   (state: StateSchema, path: string) => path,
//   (scroll, path) => scroll[path] || 0
// )
