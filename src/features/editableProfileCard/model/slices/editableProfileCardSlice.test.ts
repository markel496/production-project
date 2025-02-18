import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { ValidateProfileError } from '../consts/editableProfileCardConsts'
import { EditableProfileCardSchema } from '../types/editableProfileCardSchema'

import {
  editableProfileCardActions,
  editableProfileCardReducer
} from './editableProfileCardSlice'

const data = {
  first: 'Ivan',
  lastname: 'Markelov',
  age: '26',
  city: 'Saint-P',
  username: 'admin'
}

describe('profileSlice.test', () => {
  test('setReadonly', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      readonly: true
    }
    expect(
      editableProfileCardReducer(
        state as EditableProfileCardSchema,
        editableProfileCardActions.setReadonly(false)
      )
    ).toEqual({
      readonly: false
    })
  })

  test('updateProfile', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      data
    }
    expect(
      editableProfileCardReducer(
        state as EditableProfileCardSchema,
        editableProfileCardActions.updateProfile({
          age: '27',
          city: 'Saint-Petersberg',
          username: 'admin123'
        })
      )
    ).toEqual({
      data: {
        first: 'Ivan',
        lastname: 'Markelov',
        age: '27',
        city: 'Saint-Petersberg',
        username: 'admin123'
      }
    })
  })

  test('cancelEdit', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      initialData: data,
      data: {
        ...data,
        age: '27',
        city: 'Saint-Petersberg',
        username: 'admin123'
      },
      readonly: false,
      validateErrors: [
        ValidateProfileError.INCORRECT_LASTNAME,
        ValidateProfileError.INCORRECT_AGE,
        ValidateProfileError.INCORRECT_CITY
      ]
    }
    expect(
      editableProfileCardReducer(
        state as EditableProfileCardSchema,
        editableProfileCardActions.cancelEdit()
      )
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data: state.initialData,
      initialData: state.initialData
    })
  })

  test('updateProfileData.pending', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      validateErrors: [ValidateProfileError.INCORRECT_AGE],
      isLoading: false
    }
    expect(
      editableProfileCardReducer(
        state as EditableProfileCardSchema,
        updateProfileData.pending
      )
    ).toEqual({
      validateErrors: undefined,
      isLoading: true
    })
  })

  test('updateProfileData.fulfilled', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      isLoading: true,
      initialData: data,
      data,
      readonly: false
    }
    expect(
      editableProfileCardReducer(
        state as EditableProfileCardSchema,
        updateProfileData.fulfilled(
          {
            ...data,
            age: '27',
            city: 'Saint-Petersberg',
            username: 'admin123'
          },
          ''
        )
      )
    ).toEqual({
      isLoading: false,
      initialData: {
        ...data,
        age: '27',
        city: 'Saint-Petersberg',
        username: 'admin123'
      },
      data: {
        ...data,
        age: '27',
        city: 'Saint-Petersberg',
        username: 'admin123'
      },
      readonly: true
    })
  })

  test('updateProfileData.rejected', () => {
    const state: DeepPartial<EditableProfileCardSchema> = {
      validateErrors: undefined,
      isLoading: true
    }
    expect(
      editableProfileCardReducer(
        state as EditableProfileCardSchema,
        updateProfileData.rejected(null, '', undefined, [
          ValidateProfileError.INCORRECT_NAME
        ])
      )
    ).toEqual({
      validateErrors: [ValidateProfileError.INCORRECT_NAME],
      isLoading: false
    })
  })
})
