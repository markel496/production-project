import { UserRole } from '../consts/userConsts'

export interface User {
  _id: string
  username: string
  roles?: UserRole[]
  avatar?: string
}

export interface UserSchema {
  authData?: User
  _inited: boolean
}
