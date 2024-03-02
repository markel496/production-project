import { StateSchema } from 'app/providers/StoreProvider'

export const getNewCommentText = (state: StateSchema) =>
  state.addNewComment?.text ?? ''
//?? - '' когда левая часть null или undefined

export const getNewCommentError = (state: StateSchema) =>
  state.addNewComment?.error
