import { useEffect, useState } from 'react';
import isBrowser from '../lib/isBrowser';

// Custom hook for persisting state to localStorage.
// It synchronizes the given state with a key in the browser's localStorage, allowing the state to persist through page refreshes.
// T is a generic type parameter that represents the type of the value being stored.
const useLocalStorage = <T = any>(key: string, initialValue: T | (() => T)) => {
  // useState is initialized with a function that attempts to retrieve the existing value from localStorage
  // or initialize it with the provided initialValue if no value is found.
  const [value, setValue] = useState<T>(() => {
    // Attempt to retrieve the existing value from localStorage using the provided key.
    const JsonValue = isBrowser ? localStorage.getItem(key) : null;

    // If a value is found, parse the JSON stored in localStorage and return it.
    if (JsonValue != null) {
      return JSON.parse(JsonValue);
    }

    // If no value is found and the initialValue is a function, call the function to obtain the initial value.
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      // If initialValue is not a function, simply return it as the initial value.
      return initialValue;
    }
  });

  // useEffect is used to update the localStorage item whenever the key or the value changes.
  useEffect(() => {
    if (isBrowser && window.localStorage) {
      // When the value or key changes, update the corresponding item in localStorage with the new value.
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  // Return the current value and the function to update it, allowing the user of the hook to read and update the localStorage-backed state.
  return [value, setValue] as [typeof value, typeof setValue];
};

export default useLocalStorage;
