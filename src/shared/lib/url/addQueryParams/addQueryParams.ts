export function getQueryParams(params: OptionalRecord<string, string>) {
  //Объект с существующими параметрами, которые уже есть в строке запроса
  const searchParams = new URLSearchParams(window.location.search)

  //С помощью Object.entries пробегаюсь по параметрам, которые принял аргументом и добавляю их к существующим параметрам
  Object.entries(params).forEach(([name, value]) => {
    if (value) {
      searchParams.set(name, value)
    }
    if (name === 'search' && !value) {
      searchParams.delete(name)
    }
  })

  return `?${searchParams.toString()}`
}

/**
 * Функция добавления строки запроса в URL
 * @param params
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
  window.history.pushState(null, '', getQueryParams(params))
}
