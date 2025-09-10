import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    // debug: __IS_DEV__,
    debug: false,

    ns: [
      'translation',
      'about',
      'admin',
      'articles',
      'comments',
      'edit',
      'main',
      'profile'
    ], // 👈 перечисляем доступные namespaces
    defaultNS: 'translation', // 👈 по умолчанию остаётся translation

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export default i18n
