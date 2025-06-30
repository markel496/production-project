import { FeatureFlags } from '@/shared/types/featureFlags'

import { UserRole } from '../consts/userConsts'

import { UserSettings } from './userSettings'

export interface User {
  _id: string
  username: string
  roles?: UserRole[]
  avatar?: string
  features?: FeatureFlags
  settings?: UserSettings
}

export interface UserSchema {
  authData?: User
  _inited: boolean
}
