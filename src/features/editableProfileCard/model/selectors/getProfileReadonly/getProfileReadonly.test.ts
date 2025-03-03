import { StateSchema } from '@/app/providers/StoreProvider'

import { getProfileReadonly } from './getProfileReadonly'

describe('getProfileReadonly.test', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true
      }
    }
    expect(getProfileReadonly(state as StateSchema)).toEqual(true)
  })

  test('should return false', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: false
      }
    }
    expect(getProfileReadonly(state as StateSchema)).toEqual(false)
  })
})
