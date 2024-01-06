import { useEffect, RefObject } from 'react';

// Define the type for the handler function
type EventHandler = (event: MouseEvent | TouchEvent) => void;

const useClickOutside = (
  ref: RefObject<HTMLElement>, // Use RefObject for a more specific type than useRef
  handler: EventHandler
): void => {
  // Specify that this hook doesn't return anything
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Make sure the ref is currently pointing to an element
      // and that the click is not inside that element
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event); // Call the handler if the click is outside
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Dependencies array for the effect
};

export default useClickOutside;
