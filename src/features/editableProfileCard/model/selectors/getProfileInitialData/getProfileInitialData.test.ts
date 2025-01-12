import { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileInitialData } from './getProfileInitialData'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

describe('getProfileInitialData.test', () => {
  test('should return profile initial data', () => {
    const initialData = {
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
        initialData
      }
    }
    expect(getProfileInitialData(state as StateSchema)).toEqual(initialData)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileInitialData(state as StateSchema)).toEqual(undefined)
  })
})
