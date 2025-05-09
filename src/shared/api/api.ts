import axios from 'axios'

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

//Создаю инстанс axios

export const $api = axios.create({
  baseURL: __API__
})

// Будет отрабатывать перед любым запросом
$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
  }
  return config
})
