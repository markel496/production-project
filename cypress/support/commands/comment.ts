import { Comment } from '@/entities/Comment'

interface EditCommentArgs {
  text?: string
  cancel?: boolean
}

export const createComment = (text?: string) => {
  cy.getByTestId('AddNewCommentForm').scrollIntoView()
  if (text) {
    cy.getByTestId('AddNewCommentForm.Input').type(text)
  }
  cy.getByTestId('AddNewCommentForm.SendBtn').click()
}

export const editComment = (options: EditCommentArgs) => {
  const { text, cancel } = options

  cy.getByTestId('CommentCard').scrollIntoView()
  cy.getByTestId('CommentCard.EditBtn').click()
  cy.getByTestId('EditCommentForm.Input').clear()
  if (text) {
    cy.getByTestId('EditCommentForm.Input').type(text)
  }
  if (cancel) {
    cy.getByTestId('EditCommentForm.CancelBtn').click()
    return
  }
  cy.getByTestId('EditCommentForm.ChangeBtn').click({ force: true })
}

export const deleteComment = () => {
  cy.getByTestId('CommentCard.DeleteBtn').click()
}

declare global {
  namespace Cypress {
    interface Chainable {
      createComment(text?: string): Chainable<Comment>
      editComment(options: EditCommentArgs): Chainable<void>
      deleteComment(): Chainable<void>
    }
  }
}
