import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddNewCommentSchema } from '../types/addNewComment'

const initialState: AddNewCommentSchema = {
  text: '',
  error: false
}

export const addNewCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    }
  }
})

export const { actions: addNewCommentActions } = addNewCommentSlice
export const { reducer: addNewCommentReducer } = addNewCommentSlice
