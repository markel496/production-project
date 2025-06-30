import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'

import { UserSettings } from '../../model/types/userSettings'
import { setUserSettingsMutation } from '../../api/userApi'
import { getUserAuthData } from '../selectors/authDataSelectors'
import { getUserSettings } from '../selectors/getUserSettings'

export const saveUserSettings = createAsyncThunk<
  UserSettings,
  UserSettings,
  ThunkConfig<string>
>('user/saveUserSettings', async (newSettings, thunkAPI) => {
  const { rejectWithValue, dispatch, getState } = thunkAPI

  const userData = getUserAuthData(getState())
  const currentSettings = getUserSettings(getState())

  if (!userData) {
    return rejectWithValue('')
  }

  try {
    const response = await dispatch(
      setUserSettingsMutation({
        userId: userData._id,
        settings: { ...currentSettings, ...newSettings }
      })
    ).unwrap()

    return response
  } catch (e) {
    return rejectWithValue('Не удалось сохранить настройки пользователя в бд')
  }
})
