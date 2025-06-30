import { rtkApi } from '@/shared/api/rtkApi'

import { UserSettings } from '../model/types/userSettings'
import { User } from '../model/types/user'

interface setUserSettingsArgs {
  userId: string
  settings: UserSettings
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserDataById: build.mutation<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET'
      })
    }),

    setUserSettings: build.mutation<UserSettings, setUserSettingsArgs>({
      query: ({ userId, settings }) => ({
        url: `/users/${userId}`,
        body: settings,
        method: 'PATCH'
      })
    })
  })
})

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate

export const setUserSettingsMutation =
  userApi.endpoints.setUserSettings.initiate
