let currentProfileId = ''
describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      currentProfileId = data._id
      cy.visit(`profile/${currentProfileId}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(currentProfileId)
  })

  it('Профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'Tommy')
  })

  it('Профиль редактируется', () => {
    const newName = 'newName'
    const newLastname = 'newLastname'
    cy.updateProfile(newName, newLastname)
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
  })
})
