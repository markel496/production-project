import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const initialState: ProfileSchema = {
  initialData: undefined,
  error: undefined,
  isLoading: false,
  readonly: true
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },

    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.data = { ...state.data, ...action.payload }
    },

    cancelEdit: (state) => {
      state.readonly = true
      state.validateErrors = undefined
      state.data = state.initialData
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(
      fetchProfileData.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        state.isLoading = false
        state.initialData = action.payload
        state.data = action.payload
      }
    )
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    //===============================================================================================
    builder.addCase(updateProfileData.pending, (state) => {
      state.validateErrors = undefined
      state.isLoading = true
    })
    builder.addCase(
      updateProfileData.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        state.isLoading = false
        state.initialData = action.payload
        state.data = action.payload
        state.readonly = true
      }
    )
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false
      state.validateErrors = action.payload
    })
  }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
