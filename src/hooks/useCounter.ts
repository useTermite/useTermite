import { useState } from 'react'

export const useCounter = (initialValue: number) => {
  const [amount, setAmount] = useState(initialValue) //The current count value

  const up = () => {
    // 'up' will increment the counter
    setAmount(prev => prev + 1)
  }

  const down = () => {
    // 'down' will decrement the counter
    setAmount(prev => prev - 1)
  }

  return { up, down, amount }
}
