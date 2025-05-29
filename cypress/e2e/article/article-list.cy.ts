describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles')
    })
  })
  it('Статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleList.Item').should('have.length.greaterThan', 3)
  })
  it('Находится статья по запросу "Python"', () => {
    cy.getByTestId('ArticleSearch.Input').clear()
    cy.getByTestId('ArticleSearch.Input').type('Python')
    cy.getByTestId('ArticleList.Item').should('have.length', 1)
    cy.getByTestId('ArticleList.Item.Text.Paragraph').should(
      'have.text',
      'Python news'
    )
  })

  it.skip('Пример заскипанного теста', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleList.Item').should('have.length.greaterThan', 3)
  })

  it('Пример на стабах (фикстурах)', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' })
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleList.Item').should('have.length', 4)
  })
})
