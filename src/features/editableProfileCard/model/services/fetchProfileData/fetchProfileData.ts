import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'

export const fetchProfileData = createAsyncThunk<
  Profile,
  string | undefined,
  ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  if (!profileId) {
    return rejectWithValue('error')
  }

  try {
    const response = await extra.api.get<Profile>(`/profile/${profileId}`)

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
