import { Profile } from '@/entities/Profile'

import { ValidateProfileError } from '../consts/editableProfileCardConsts'

export interface EditableProfileCardSchema {
  initialData?: Profile
  data?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
  validateErrors?: ValidateProfileError[]
}
