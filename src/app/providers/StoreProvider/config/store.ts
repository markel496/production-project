import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter'

//Так можно будет отдельно создавать store для jest или storybook
export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: { counter: counterReducer },
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}

/** Для тестов, сторибуков понадобится инициализировать store для того, чтобы инициализировать нужные данные. Эти данные можно принимать аргументом как initialState*/
