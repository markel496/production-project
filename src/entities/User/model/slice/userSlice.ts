import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'

import { User, UserSchema } from '../types/user'
import { saveUserSettings } from '../services/saveUserSettings'
import { UserSettings } from '../types/userSettings'
import { initUserData } from '../services/initUserData'

const initialState: UserSchema = {
  _inited: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initUserData.rejected, (state) => {
      state._inited = true
    })

    builder.addCase(
      initUserData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload
        setFeatureFlags(state.authData.features)
        state._inited = true
      }
    )

    //===============================================================================================

    builder.addCase(
      saveUserSettings.fulfilled,
      (state, { payload }: PayloadAction<UserSettings>) => {
        if (state.authData) {
          state.authData.settings = payload
        }
      }
    )
  }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
