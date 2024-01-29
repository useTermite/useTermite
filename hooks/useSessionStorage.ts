import { useEffect, useState } from 'react';

// Custom hook for persisting state to sessionStorage.
// It synchronizes the given state with a key in the browser's sessionStorage, allowing the state to persist through page refreshes.
// T is a generic type parameter that represents the type of the value being stored.
const useSessionStorage = <T = any>(key: string, initialValue: T | (() => T)) => {
  // useState is initialized with a function that attempts to retrieve the existing value from sessionStorage
  // or initialize it with the provided initialValue if no value is found.
  const [value, setValue] = useState<T>(() => {
    // Attempt to retrieve the existing value from sessionStorage using the provided key.
    const JsonValue = sessionStorage.getItem(key);

    // If a value is found, parse the JSON stored in sessionStorage and return it.
    if (JsonValue !== null) {
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

  // useEffect is used to update the sessionStorage item whenever the key or the value changes.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      // When the value or key changes, update the corresponding item in sessionStorage with the new value.
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  // Return the current value and the function to update it, allowing the user of the hook to read and update the sessionStorage-backed state.
  return [value, setValue] as [typeof value, typeof setValue];
};

export default useSessionStorage;