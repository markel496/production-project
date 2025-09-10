import { useTranslation } from 'react-i18next'

import about from '../../../../../public/locales/ru/about.json'

// ключи берём из JSON
type AboutKeys = keyof typeof about

export function useAboutTextTranslate() {
  const { t } = useTranslation('about')

  const strings = {} as Record<AboutKeys, string>

  const aboutKeys = Object.keys(about) as AboutKeys[]

  aboutKeys.forEach((key) => {
    strings[key] = t(key)
  })

  return strings
}
