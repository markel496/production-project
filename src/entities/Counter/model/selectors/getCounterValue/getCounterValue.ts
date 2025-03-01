// import { createSelector } from '@reduxjs/toolkit'

// import { getCounter } from '../getCounter/getCounter'
// import { CounterSchema } from '../../types/counterSchema'
import { buildSelector } from '@/shared/lib/store'

// export const getCounterValue = createSelector(
//   getCounter,
//   (counter: CounterSchema) => counter.value
// )

export const [useGetCounterValue, getCounterValue] = buildSelector(
  (state) => state.counter.value
)
