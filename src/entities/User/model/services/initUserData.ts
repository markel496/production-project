import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

import { getUserDataByIdQuery } from '../../api/userApi'
import { User } from '../types/user'

export const initUserData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/getUser',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    const id = localStorage.getItem(USER_LOCALSTORAGE_KEY)

    if (!id) {
      return rejectWithValue('')
    }

    const userId = JSON.parse(id)

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()

      return response
    } catch (e) {
      return rejectWithValue('Не удалось получить данные пользователя')
    }
  }
)
