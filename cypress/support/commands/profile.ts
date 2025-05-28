export const updateProfile = (newName: string, newLastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditBtn').click()
  /** Нахожу инпут по data-testid, очищаю его значение и записываю новое */
  cy.getByTestId('ProfileCard.firstname').clear()
  cy.getByTestId('ProfileCard.firstname').type(newName)
  //===============================================================================================
  cy.getByTestId('ProfileCard.lastname').clear()
  cy.getByTestId('ProfileCard.lastname').type(newLastname)
  cy.getByTestId('EditableProfileCardHeader.SendBtn').click()
}

export const resetProfile = (profileId: string) =>
  cy.request({
    method: 'PUT',
    url: `http://localhost:4000/profile/${profileId}`,
    body: {
      first: 'Tommy',
      lastname: 'Vercetti',
      age: '28',
      currency: 'RUB',
      country: 'Russia',
      city: 'Moscow',
      username: 'tommy420',
      avatar: 'https://i1.sndcdn.com/avatars-000150805653-ocp9ga-t500x500.jpg',
      id: '67eecd8cceb0558a80db9a90'
    },
    headers: {
      Authorization: '123'
    }
  })

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(newName: string, newLastname: string): Chainable<void>
      resetProfile(profileId: string): Chainable<void>
    }
  }
}
