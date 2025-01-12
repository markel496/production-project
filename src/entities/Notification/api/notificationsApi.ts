import { rtkApi } from '@/shared/api/rtkApi'
import { Notification } from '../model/types/notification'

const notificationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], string | undefined>({
      query: (id) => ({
        url: `/notifications/${id}`
      })
    })
  })
})

export const useNotifications = notificationsApi.useGetNotificationsQuery
