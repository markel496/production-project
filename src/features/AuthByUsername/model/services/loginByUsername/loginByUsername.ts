import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User, userActions } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'

interface loginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  loginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { dispatch, extra, rejectWithValue } = thunkAPI

  try {
    const response = await extra.api.post<User>('/login', authData)
    if (!response.data) {
      throw new Error()
    }

    localStorage.setItem(
      USER_LOCALSTORAGE_KEY,
      JSON.stringify(response.data._id)
    )

    setFeatureFlags(response.data.features)

    dispatch(userActions.setAuthData(response.data))

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
