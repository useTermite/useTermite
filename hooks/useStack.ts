import { useEffect, useState } from 'react'
import Stack from '../lib/stack'

const stackList = new Stack()
const useStack = (intialValue: any[] = []) => {
  const [stack, setStack] = useState([...intialValue] || [])

  const setStackToState = () => {
    setStack([...stackList.items])
  }

  useEffect(() => {
    if (intialValue.length) {
      intialValue?.forEach(item => {
        stackList.push(item)
      })
    }
  }, [])

  // stackList.push
  const push = <T>(value: T) => {
    stackList.push(value)
    setStackToState()
  }

  // stackList.pop
  const pop = (): void => {
    stackList.pop()
    setStackToState()
  }

  // stackList.clear
  const clear = (): void => {
    stackList.clear()
    setStackToState()
  }

  // stackList.isEmpty
  const isEmpty = (): boolean => {
    return stackList.isEmpty()
  }

  // stackList.printStack;
  const printStack = (): string => {
    return stackList.printStack()
  }

  // stackList.size
  const peek = (): any => {
    return stackList.peek()
  }

  return {
    stack,
    push,
    peek,
    pop,
    clear,
    isEmpty,
    printStack,
    size: stack.length
  }
}

export default useStack
