export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

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
