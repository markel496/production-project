import { StateSchema } from '@/app/providers/StoreProvider'

import { getLoginError } from './getLoginError'

describe('getLoginError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: { error: 'some error...' }
    }
    expect(getLoginError(state as StateSchema)).toEqual('some error...')
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginError(state as StateSchema)).toEqual(undefined)
  })
})
