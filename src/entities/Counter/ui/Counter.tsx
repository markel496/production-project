/* eslint-disable i18next/no-literal-string */
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'shared/ui/Button/Button'
import { counterActions } from '../model/slice/CounterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)

  const increment = () => {
    dispatch(counterActions.increment())
  }

  const decrement = () => {
    dispatch(counterActions.decrement())
  }

  return (
    <div>
      <h1 data-testid="value-title">value = {counterValue}</h1>
      <Button onClick={increment} data-testid="increment-btn">
        increment
      </Button>
      <Button onClick={decrement} data-testid="decrement-btn">
        decrement
      </Button>
    </div>
  )
}