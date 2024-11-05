import { ValidateProfileError } from '../../model/consts/editableProfileCardConsts'
import { validateProfileData } from './validateProfileData'

const data = {
  first: 'Ivan',
  lastname: 'Markelov',
  age: '26',
  city: 'Saint-P',
  username: 'admin'
}

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = await validateProfileData(data)
    expect(result).toEqual([])
  })

  test('without first name', async () => {
    const result = await validateProfileData({ ...data, first: '' })
    expect(result).toEqual([ValidateProfileError.INCORRECT_NAME])
  })

  test('without last name', async () => {
    const result = await validateProfileData({ ...data, lastname: '' })
    expect(result).toEqual([ValidateProfileError.INCORRECT_LASTNAME])
  })

  test('incorrect age', async () => {
    const result = await validateProfileData({ ...data, age: '200' })
    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
  })

  test('without username', async () => {
    const result = await validateProfileData({ ...data, username: '' })
    expect(result).toEqual([ValidateProfileError.INCORRECT_USERNAME])
  })

  test('without city', async () => {
    const result = await validateProfileData({ ...data, city: '' })
    expect(result).toEqual([ValidateProfileError.INCORRECT_CITY])
  })

  test('without city and username, incorrect age', async () => {
    const result = await validateProfileData({
      ...data,
      city: '',
      username: '',
      age: '0'
    })
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_USERNAME,
      ValidateProfileError.INCORRECT_CITY
    ])
  })
})
