import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { SaveScrollSchema } from '../types/saveScroll'

const initialState: SaveScrollSchema = {
  scroll: {}
}

export const articleSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>
    ) => {
      state.scroll[payload.path] = payload.position
    }
  }
})

export const { actions: saveScrollActions } = articleSlice
export const { reducer: saveScrollReducer } = articleSlice
