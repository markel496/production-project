let currentArticleId = ''

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((article) => {
      currentArticleId = article._id
      cy.visit(`articles/${currentArticleId}`)
    })
  })
  afterEach(() => {
    cy.removeArticle(currentArticleId)
  })
  it('Видит нужный заголовок созданной статьи', () => {
    cy.getByTestId('ArticleDetailsTextTitle.Title').should(
      'have.text',
      'Test Article'
    )
  })
  it('Видит нужный подзаголовок созданной статьи', () => {
    cy.getByTestId('ArticleDetailsTextTitle.Paragraph').should(
      'have.text',
      '14.04.2025 20:17'
    )
  })
  it('Видит количество просмотров статьи', () => {
    cy.getByTestId('ArticleDetailsTextViews.Paragraph').contains('101')
  })
  it('Видит нужное количество рекомендованных статей', () => {
    cy.getByTestId('ArticleList.Item').should('have.length', 4)
  })
  it('Оставляет комментарий', () => {
    cy.createComment('test comment123')
    cy.getByTestId('CommentCard').should('exist')
    cy.getByTestId('CommentCard.Text.Paragraph').should(
      'have.text',
      'test comment123'
    )
    cy.deleteComment()
  })
  it('Создает комментарий и редактирует его', () => {
    cy.createComment('test comment123')
    cy.editComment({ text: 'test comment123 update' })
    cy.getByTestId('CommentCard.Text.Paragraph').should(
      'have.text',
      'test comment123 update'
    )
    cy.deleteComment()
  })
  it('Оставляет пустой комментарий и видит ошибку валидации', () => {
    cy.createComment()
    cy.getByTestId('AddNewCommentForm').should(
      'have.css',
      'border',
      '1px solid rgb(255, 2, 2)'
    )
  })
  it('Создает комментарий и пытается изменить его на пустой', () => {
    cy.createComment('test comment123')
    cy.editComment({ text: '' })
    cy.getByTestId('EditCommentForm.ChangeBtn').should('be.disabled')
    cy.deleteComment()
  })
  it('Создает комментарий и пытается изменить его на такой же', () => {
    cy.createComment('test comment123')
    cy.editComment({ text: 'test comment123' })
    cy.getByTestId('EditCommentForm.ChangeBtn').should('be.disabled')
    cy.deleteComment()
  })
  it('Создает комментарий, редактирует его и отменяет', () => {
    cy.createComment('test comment123')
    cy.editComment({ text: 'update', cancel: true })
    cy.getByTestId('EditCommentForm').should('not.exist')
    cy.deleteComment()
  })
  it('Оценивает статью', () => {
    cy.setRate({ starsCount: 3, feedback: 'test12345' })
    cy.getByTestId('RatingCard.Text.Title').should(
      'have.text',
      'Спасибо, что оценили статью!'
    )
    cy.get('[data-selected=true]').should('have.length', 3) // количество выбранных звезд
    cy.resetRate()
  })
  it('Оценивает статью и отменяет', () => {
    cy.setRate({ starsCount: 4, cancel: true })
    cy.getByTestId('RatingCard.Text.Title').should(
      'have.text',
      'Как Вам статья?'
    )
    cy.get('[data-selected=true]').should('have.length', 0) // количество выбранных звезд
    cy.getByTestId('RatingCard.ResetBtn').should('not.exist')
  })
})
