import { useEffect, useState, useCallback } from 'react';
import Stack from '../lib/stack';

const stackList = new Stack();

const useStack = (initialValue: any[] = []) => {
  const [stack, setStack] = useState([...initialValue] || []);

  // useCallback ensures that the same function reference is used between renders
  // unless its dependencies change. This helps in avoiding unnecessary re-renders.
  const setStackToState = useCallback(() => {
    setStack([...stackList.items]);
  }, [stackList.items]);

  useEffect(() => {
    // Set the stack only once when the component mounts.
    // This effect does not depend on 'initialValue', so it's not included in the dependencies array.
    if (initialValue.length) {
      initialValue.forEach(item => {
        stackList.push(item);
      });
      setStackToState();
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  const push = useCallback(
    <T>(value: T) => {
      stackList.push(value);
      setStackToState();
    },
    [setStackToState]
  ); // Dependency on setStackToState which is stable.

  const pop = useCallback((): void => {
    stackList.pop();
    setStackToState();
  }, [setStackToState]); // Dependency on setStackToState which is stable.

  const clear = useCallback((): void => {
    stackList.clear();
    setStackToState();
  }, [setStackToState]); // Dependency on setStackToState which is stable.

  const isEmpty = useCallback((): boolean => {
    return stackList.isEmpty();
  }, []); // No external dependencies.

  const printStack = useCallback((): string => {
    return stackList.printStack();
  }, []); // No external dependencies.

  const peek = useCallback((): any => {
    return stackList.peek();
  }, []); // No external dependencies.

  return {
    stack,
    push,
    peek,
    pop,
    clear,
    isEmpty,
    printStack,
    size: stack.length
  };
};

export default useStack;
