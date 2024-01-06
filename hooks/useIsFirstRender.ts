import { useRef, useEffect } from 'react';

// This hook returns true for the first render and false for all subsequent renders
const useIsFirstRender = (): boolean => {
  // Use useRef to store a mutable value that persists across renders
  // The value is initially true, indicating the first render
  const isFirst = useRef<boolean>(true);

  useEffect(() => {
    // After the first render, set the value to false
    // This will not trigger an additional render
    isFirst.current = false;
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return isFirst.current; // Return the current value (true for the first render, false thereafter)
};

export default useIsFirstRender;
