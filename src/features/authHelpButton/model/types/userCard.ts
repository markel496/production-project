interface UserCardOptions {
  name: string
  isExist: boolean
}

export interface UserCard {
  user: string
  login: string
  password: string
  options?: UserCardOptions[]
}
