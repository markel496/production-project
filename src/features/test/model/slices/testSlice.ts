import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TestSchema } from '../types/testSchema'

const initialState: TestSchema = {}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {}
  }
  // extraReducers: (builder) => {
  //  builder
  //   .addCase(, (state) => {
  //      state.error = undefined;
  //      state.isLoading = true;
  //    })
  //   .addCase(, (state) => {
  //     state.isLoading = false;
  //    })
  //   .addCase(, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //   })
  // }
})

export const { actions: testActions, reducer: testReducer } = testSlice
