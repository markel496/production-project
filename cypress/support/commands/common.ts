import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { User } from '@/entities/User'
import { selectByTestId } from '../../helpers/selectByTestId'

export const login = (
  username: string = 'testUser',
  password: string = '12345'
) =>
  cy
    .request({
      method: 'POST',
      url: 'http://localhost:4000/login',
      body: {
        username,
        password
      }
    })
    .then(({ body }) => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))

      return body
    })

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId))

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<User>
      getByTestId(testId: string): ReturnType<typeof cy.get>
    }
  }
}
