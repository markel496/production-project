import { FeatureFlags } from '@/shared/types/featureFlags'

import { UserRole } from '../consts/userConsts'

export interface User {
  _id: string
  username: string
  roles?: UserRole[]
  avatar?: string
  features?: FeatureFlags
}

export interface UserSchema {
  authData?: User
  _inited: boolean
}
