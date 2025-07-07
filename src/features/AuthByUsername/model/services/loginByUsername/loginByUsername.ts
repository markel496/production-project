import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User, userActions } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'

import type { AxiosError } from 'axios'

interface loginByUsernameProps {
  username: string
  password: string
}

interface Error {
  message: string
}

export const loginByUsername = createAsyncThunk<
  User,
  loginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { dispatch, extra, rejectWithValue } = thunkAPI

  const { username, password } = authData

  if (!username || !password) return rejectWithValue('Validation error')

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
    const error = e as AxiosError<Error>
    if (!error.response) {
      return rejectWithValue('Server error')
    }
    return rejectWithValue(error.response.data.message)
  }
})
