import { queryByTestId, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditableProfileCard } from './EditableProfileCard'
import { componentRender } from 'shared/lib/tests/componentRender'
import { Profile } from 'entities/Profile'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { editableProfileCardReducer } from '../../model/slices/editableProfileCardSlice'
import { $api } from 'shared/api/api'

const profile: Profile = {
  id: '1',
  first: 'Ivan',
  lastname: 'Markelov',
  age: '26',
  country: Country.Russia,
  city: 'Saint-P',
  username: 'admin',
  currency: Currency.EUR
}

const options = {
  initialState: {
    profile: {
      initialData: profile,
      data: profile,
      readonly: true
    },
    user: { authData: { _id: '1' } }
  },
  asyncReducers: { profile: editableProfileCardReducer }
}

describe('features/EditableProfileCard', () => {
  test('readonly should switch', async () => {
    const user = userEvent.setup()
    componentRender(<EditableProfileCard />, options)

    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn')
    await user.click(editBtn)
    const cancelBtn = screen.getByTestId('EditableProfileCardHeader.CancelBtn')
    expect(cancelBtn).toBeInTheDocument()
  })

  test('When canceling, the new values are reset', async () => {
    const user = userEvent.setup()
    componentRender(<EditableProfileCard />, options)
    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn')

    await user.click(editBtn)

    const firstname = screen.getByTestId('ProfileCard.firstname')
    const lastname = screen.getByTestId('ProfileCard.lastname')
    const cancelBtn = screen.getByTestId('EditableProfileCardHeader.CancelBtn')

    await user.clear(firstname)
    await user.clear(lastname)
    await user.type(firstname, 'Vasya')
    await user.type(lastname, 'Pupkin')

    expect(firstname).toHaveValue('Vasya')
    expect(lastname).toHaveValue('Pupkin')

    await user.click(cancelBtn)

    expect(firstname).toHaveValue('Ivan')
    expect(lastname).toHaveValue('Markelov')
  })

  test('With validations errors', async () => {
    const user = userEvent.setup()
    componentRender(<EditableProfileCard />, options)
    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn')

    await user.click(editBtn)

    const firstname = screen.getByTestId('ProfileCard.firstname')
    const lastname = screen.getByTestId('ProfileCard.lastname')

    await user.clear(firstname)
    await user.clear(lastname)

    const sendBtn = screen.getByTestId('EditableProfileCardHeader.SendBtn')

    await user.click(sendBtn)

    const textErrors = screen.getAllByTestId(
      'EditableProfileCard.Error.Paragraph'
    )

    expect(textErrors).toHaveLength(2)

    textErrors.forEach((error) => expect(error).toBeInTheDocument())
  })

  test('Send request', async () => {
    const user = userEvent.setup()
    const mockPutReq = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard />, options)
    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn')

    await user.click(editBtn)

    expect(
      queryByTestId(
        document.documentElement,
        'EditableProfileCardHeader.SendBtn'
      )
    ).not.toBeInTheDocument() // Кнопки сохранить нет, тк ничего не менял в инпутах

    const firstname = screen.getByTestId('ProfileCard.firstname')

    await user.click(firstname)

    await user.keyboard('123')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Ivan123')

    const sendBtn = screen.getByTestId('EditableProfileCardHeader.SendBtn')

    await user.click(sendBtn)

    expect(mockPutReq).toHaveBeenCalled()
  })
})

// npm run test:unit EditableProfileCard.test.tsx
