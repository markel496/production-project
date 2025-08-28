import { userActions } from '@/entities/User'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk'

import { loginByUsername } from './loginByUsername'

describe('loginByUsername.test', () => {
  test('success login', async () => {
    const userValue = { _id: '1', username: 'Vanya' }
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
    const result = await thunk.callThunk({
      username: 'Vanya',
      password: '12345'
    })

    console.log(result)
    //dispatch вызвался 3 раза
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    //Проверяет, что dispatch вызвался с нужным аргументом
    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue)
    )
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userValue)
  })

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk({
      username: 'Vanya',
      password: '12345'
    })

    console.log(result)

    //В этом случае dispatch отработать не должен
    // expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('Server error')
  })
})

/**В первый раз dispatch отрабатывает, когда вызывается loginByUsername(), второй - когда мы его вызываем с userActions.setAuthData(response.data), третий вызов происходит, когда fulfilled (action успешно выполняется и происходит return) */

/**ДО TestAsyncThunk*/
// describe('loginByUsername.test', () => {
//   let dispatch: Dispatch
//   let getState: () => StateSchema

//   //Отрабатывает перед каждым тестом
//   beforeEach(() => {
//     dispatch = jest.fn()
//     getState = jest.fn()
//   })

//   test('success login', async () => {
//     const userValue = { _id: '1', username: 'Vanya' }
//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))
//     const action = loginByUsername({ username: 'Vanya', password: '12345' })
//     const result = await action(dispatch, getState, undefined)

//     console.log(result)
//     //dispatch вызвался 3 раза
//     expect(dispatch).toHaveBeenCalledTimes(3)
//     //Проверяет, что dispatch вызвался с нужным аргументом
//     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
//     expect(mockedAxios.post).toHaveBeenCalled()
//     expect(result.meta.requestStatus).toBe('fulfilled')
//     expect(result.payload).toEqual(userValue)
//   })

//   test('error login', async () => {
//     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
//     const action = loginByUsername({ username: 'Vanya', password: '12345' })
//     const result = await action(dispatch, getState, undefined)

//     console.log(result)

//     //В этом случае dispatch отработать не должен
//     // expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
//     expect(dispatch).toHaveBeenCalledTimes(2)
//     expect(mockedAxios.post).toHaveBeenCalled()
//     expect(result.meta.requestStatus).toBe('rejected')
//     expect(result.payload).toBe('error')
//   })
// })
