import { StateSchema } from '@/app/providers/StoreProvider'

import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

import { getProfileData } from './getProfileData'

describe('getProfileData.test', () => {
  test('should return profile data', () => {
    const data = {
      first: 'Ivan',
      lastname: 'Markelov',
      age: '26',
      country: Country.Russia,
      city: 'Saint-P',
      username: 'admin',
      currency: Currency.EUR,
      avatar:
        'https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg'
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        data
      }
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
