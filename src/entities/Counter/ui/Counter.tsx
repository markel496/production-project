/* eslint-disable i18next/no-literal-string */
import { Button } from '@/shared/ui/Button'

import { useCounterActions } from '../model/slice/counterSlice'
import { useGetCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
  const counterValue = useGetCounterValue()
  const { decrement, increment, add } = useCounterActions()

  return (
    <div>
      <h1 data-testid="value-title">value = {counterValue}</h1>
      <Button
        style={{ background: 'green' }}
        onClick={() => increment()}
        data-testid="increment-btn"
      >
        increment
      </Button>
      <Button
        style={{ background: 'red' }}
        onClick={() => decrement()}
        data-testid="decrement-btn"
      >
        decrement
      </Button>
      <Button
        style={{ background: 'yellow' }}
        onClick={() => add(5)}
        data-testid="decrement-btn"
      >
        add
      </Button>
    </div>
  )
}
