import { EditableProfileCard } from '@/features/editableProfileCard'

import { TestProvider } from '@/shared/lib/tests/componentRender'

const USER_ID = '1'

describe('EditableProfileCard.cy.tsx', () => {
  it('playground', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' })
    cy.mount(
      <TestProvider
        options={{ initialState: { user: { authData: { _id: USER_ID } } } }}
      >
        <EditableProfileCard id={USER_ID} />
      </TestProvider>
    )
    // Тест кейс
  })
})
