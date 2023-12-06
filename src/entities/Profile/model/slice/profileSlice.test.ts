import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { ProfileSchema, ValidateProfileError } from '../types/profile'
import { profileActions, profileReducer } from './profileSlice'

const data = {
  first: 'Ivan',
  lastname: 'Markelov',
  age: '26',
  city: 'Saint-P',
  username: 'admin'
}

describe('profileSlice.test', () => {
  test('setReadonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: true
    }
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(false))
    ).toEqual({
      readonly: false
    })
  })

  test('updateProfile', () => {
    const state: DeepPartial<ProfileSchema> = {
      data
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
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
    const state: DeepPartial<ProfileSchema> = {
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
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data: state.initialData,
      initialData: state.initialData
    })
  })

  test('updateProfileData.pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      validateErrors: [ValidateProfileError.INCORRECT_AGE],
      isLoading: false
    }
    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({
      validateErrors: undefined,
      isLoading: true
    })
  })

  test('updateProfileData.fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      initialData: data,
      data,
      readonly: false
    }
    expect(
      profileReducer(
        state as ProfileSchema,
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
    const state: DeepPartial<ProfileSchema> = {
      validateErrors: undefined,
      isLoading: true
    }
    expect(
      profileReducer(
        state as ProfileSchema,
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
