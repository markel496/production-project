import { DeepPartial } from '@reduxjs/toolkit'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'
import { LoginSchema } from '../types/loginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice.test', () => {
  test('username', () => {
    const state: DeepPartial<LoginSchema> = {
      username: ''
    }
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('Vanya'))
    ).toEqual({
      username: 'Vanya'
    })
  })

  test('password', () => {
    const state: DeepPartial<LoginSchema> = {
      password: ''
    }
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('12345'))
    ).toEqual({
      password: '12345'
    })
  })

  test('isLoading', () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: false
    }
    expect(loginReducer(state as LoginSchema, loginByUsername.pending)).toEqual(
      {
        isLoading: true
      }
    )
  })
})
