import { ValidateProfileError } from '../../model/consts/editableProfileCardConsts'
import { Profile } from 'entities/Profile'
import { validateProfileAge } from '../validateProfileAge/validateProfileAge'
import { validateProfileAvatar } from '../validateProfileAvatar/validateProfileAvatar'

export const validateProfileData = async (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA]
  }

  const { first, lastname, age, username, city, avatar } = profile

  const errors: ValidateProfileError[] = []

  if (!first) {
    errors.push(ValidateProfileError.INCORRECT_NAME)
  }

  if (!lastname) {
    errors.push(ValidateProfileError.INCORRECT_LASTNAME)
  }

  if (!validateProfileAge(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  if (!username) {
    errors.push(ValidateProfileError.INCORRECT_USERNAME)
  }

  if (!city) {
    errors.push(ValidateProfileError.INCORRECT_CITY)
  }

  if (avatar) {
    const validateAvatar = await validateProfileAvatar(avatar)
    if (!validateAvatar) {
      errors.push(ValidateProfileError.INCORRECT_AVATAR)
    }
  }
  return errors
}
