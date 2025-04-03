import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'

export const login = (
  username: string = 'testUser',
  password: string = '12345'
) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/login',
    body: {
      username,
      password
    }
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))

    cy.visit('/')
  })
}
