import { useEffect, RefObject } from 'react';

// Define the type for the callback function
type EventCallback = (event: Event) => void;
type DOMEventType = keyof GlobalEventHandlersEventMap;

// Custom hook to add and remove event listeners on a DOM element
const useEventListener = (
  ref: RefObject<HTMLElement>, // A ref object pointing to the DOM element
  event: DOMEventType, // The name of the event to listen for (e.g., 'click', 'mouseover')
  callback: EventCallback // The function to execute when the event is triggered
): void => {
  useEffect(() => {
    // Access the DOM element from the ref
    const element = ref.current;

    if (element) {
      // Add event listener
      element.addEventListener(event, callback);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(event, callback);
      };
    }
  }, [ref, event, callback]); // Re-run effect when ref, event, or callback change
};

export default useEventListener;
