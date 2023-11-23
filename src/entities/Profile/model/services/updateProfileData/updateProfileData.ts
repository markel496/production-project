import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Profile } from '../../types/profile'
import { getProfileData } from '../../selectors/getProfileData/getProfileData'

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>('profile/updateProfileData', async (_, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI

  try {
    const updatedData = getProfileData(getState())
    const response = await extra.api.put<Profile>('/profile', updatedData)

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})

/**В компонентах для получения стейта используется хук useSelector, а в async thunkах - getState()
 * Для того, чтобы у getState тип был () => StateSchema, а не () => unknown по дефолту - я добавил в ThunkConfig поле state: StateSchema
 */
