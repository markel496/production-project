import { User } from '@/entities/User'

export interface Comment {
  _id: string
  user: User
  text: string
  createdAt: string
  updatedAt: string
}

export interface EditCommentArgs {
  _id: string
  text: string
}
