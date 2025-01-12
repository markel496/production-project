import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileInitialData = (state: StateSchema) =>
  state.profile?.initialData
