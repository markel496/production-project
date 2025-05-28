import { RatingSchema } from '../../../src/entities/Rating'

interface SetRateArgs {
  starsCount?: number
  feedback?: string
  cancel?: boolean
}

export const setRate = (options: SetRateArgs) => {
  const { starsCount = 5, cancel, feedback } = options

  cy.getByTestId('RatingCard').scrollIntoView()
  cy.getByTestId(`StarNumber=${starsCount}`).click()

  if (cancel) {
    cy.getByTestId('FeedbackModal.CancelBtn').click()
    return
  }

  if (feedback) {
    cy.getByTestId('FeedbackModal.Textarea').focused()
    cy.getByTestId('FeedbackModal.Textarea').type(feedback)
  }

  cy.getByTestId('FeedbackModal.SendBtn').click()
}

export const resetRate = () => {
  cy.getByTestId('RatingCard.ResetBtn').click()
}

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(options: SetRateArgs): Chainable<RatingSchema>
      resetRate(): Chainable<void>
    }
  }
}
