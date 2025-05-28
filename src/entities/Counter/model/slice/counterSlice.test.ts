import { CounterSchema } from '../types/counterSchema'

import { counterReducer, counterSlice } from './counterSlice'

describe('CounterSlice.test', () => {
  const state: CounterSchema = { value: 10 }
  const { increment, decrement, add } = counterSlice.actions

  test('should return the initial state', () => {
    expect(counterReducer(state, { type: 'unknown' })).toEqual({
      value: 10
    })
  })

  test('increment', () => {
    expect(counterReducer(state, increment())).toEqual({
      value: 11
    })
  })

  test('decrement', () => {
    expect(counterReducer(state, decrement())).toEqual({
      value: 9
    })
  })
  test('add 5', () => {
    expect(counterReducer(state, add(5))).toEqual({
      value: 15
    })
  })
  test('should work with empty state', () => {
    expect(counterReducer(undefined, increment())).toEqual({
      value: 1
    })
  })
})
