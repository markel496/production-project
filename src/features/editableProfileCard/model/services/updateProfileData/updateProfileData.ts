import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { ValidateProfileError } from '../../consts/editableProfileCardConsts'
import { Profile } from 'entities/Profile'
import { getProfileData } from '../../selectors/getProfileData/getProfileData'
import { validateProfileData } from '../../../lib/validateProfileData/validateProfileData'

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI

  const updatedData = getProfileData(getState())
  const profileId = updatedData?.id

  const errors = await validateProfileData(updatedData)

  if (errors.length) {
    return rejectWithValue(errors)
  }

  try {
    const response = await extra.api.put<Profile>(
      `/profile/${profileId}`,
      updatedData
    )

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    return rejectWithValue([ValidateProfileError.SERVER_ERROR])
  }
})

/**В компонентах для получения стейта используется хук useSelector, а в async thunkах - getState()
 * Для того, чтобы у getState тип был () => StateSchema, а не () => unknown по дефолту - я добавил в ThunkConfig поле state: StateSchema
 */
