import { FC, lazy } from 'react'
import { AddNewCommentProps } from './AddNewComment'

export const AddNewCommentAsync = lazy<FC<AddNewCommentProps>>(
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        //@ts-ignore
        resolve(import('./AddNewComment'))
      }, 1500)
    )
)
