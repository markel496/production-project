/** Создал отдельный файл, тк настройки для пользователя мб очень большими */

import { Theme } from '@/shared/const/theme'

export interface UserSettings {
  theme?: Theme
  isFirstVisit?: boolean
}
