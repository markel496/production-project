export interface AddNewCommentSchema {
  error: boolean
  text: string
}

export interface AddNewCommentArgs {
  text: string
  createdAt: string
}
