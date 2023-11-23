import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

export interface Profile {
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
}
