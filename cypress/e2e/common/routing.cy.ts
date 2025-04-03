import { selectByTestId } from '../../helpers/selectByTestId'

describe('Роутинг', () => {
  describe('Пользователь НЕ авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/')
      cy.get(selectByTestId('MainPage')).should('exist')
    })

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/660eed36602f9f1d856400db')
      cy.get(selectByTestId('MainPage')).should('exist')
    })

    it('Переход на несуществующий маршрут', () => {
      cy.visit('/iughebriug')
      cy.get(selectByTestId('NotFoundPage')).should('exist')
    })
  })

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login()
    })

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/660eedf0602f9f1d856400dd')
      cy.get(selectByTestId('ProfilePage')).should('exist')
    })

    it('Переход на страницу статей', () => {
      cy.visit('/articles')
      cy.get(selectByTestId('ArticlesPage')).should('exist')
    })
  })
})
