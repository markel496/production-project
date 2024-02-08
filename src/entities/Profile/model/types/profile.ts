import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

export enum ValidateProfileError {
  INCORRECT_NAME = 'INCORRECT_NAME',
  INCORRECT_LASTNAME = 'INCORRECT_LASTNAME',
  INCORRECT_USERNAME = 'INCORRECT_USERNAME',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_CITY = 'INCORRECT_CITY',
  INCORRECT_AVATAR = 'INCORRECT_AVATAR',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface Profile {
  id?: string
  first?: string
  lastname?: string
  age?: string
  currency?: Currency
  country?: Country
  city?: string
  username?: string
  avatar?: string
}

export interface ProfileSchema {
  initialData?: Profile
  data?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
  validateErrors?: ValidateProfileError[]
}
