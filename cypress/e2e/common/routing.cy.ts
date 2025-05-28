describe('Роутинг', () => {
  describe('Пользователь НЕ авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/')
      cy.getByTestId('MainPage').should('exist')
    })

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/660eed36602f9f1d856400db')
      cy.getByTestId('MainPage').should('exist')
    })

    it('Переход на несуществующий маршрут', () => {
      cy.visit('/iughebriug')
      cy.getByTestId('NotFoundPage').should('exist')
    })
  })

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login()
    })

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/660eedf0602f9f1d856400dd')
      cy.getByTestId('ProfilePage').should('exist')
    })

    it('Переход на страницу статей', () => {
      cy.visit('/articles')
      cy.getByTestId('ArticlesPage').should('exist')
    })
  })
})
