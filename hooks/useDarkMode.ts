import { useEffect, useState } from 'react';
import isBrowser from '../lib/isBrowser';

// Define the possible modes as 'dark' or 'light'.
type Mode = 'dark' | 'light';

// Define the structure of the object returned by the useDarkMode hook.
interface DarkModeHook {
  mode: Mode; // The current theme mode.
  toggle: () => void; // Function to toggle the theme mode.
}

const getInitialMode = (): Mode => {
  // Check for system preference for dark mode.
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Retrieve the theme from local storage if available.
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme as Mode;
  } else {
    return prefersDark ? 'dark' : 'light'; // Default to system preference or 'light'.
  }
};

const useDarkMode = (): DarkModeHook => {
  // State to keep track of the current mode.
  const [mode, setMode] = useState<Mode>('light');

  // Effect to initialize the mode.
  useEffect(() => {
    // Get the initial mode only once when the component mounts.
    const initialMode = typeof window !== 'undefined' ? getInitialMode() : 'light';
    setMode(initialMode);
  }, []);

  // Effect to update the HTML element and local storage whenever the mode changes.
  useEffect(() => {
    const updateMode = (newMode: Mode) => {
      if (isBrowser) {
        const classList = document.documentElement.classList;
        // Update the class list on the HTML element.
        newMode === 'dark' ? classList.add('dark') : classList.remove('dark');
        // Persist the new mode in local storage.
        localStorage.setItem('theme', newMode);
      }
    };

    // Apply the mode update.
    updateMode(mode);

    // Synchronize mode across tabs.
    const handleStorageChange = () => {
      if (isBrowser) {
        const newMode = (localStorage.getItem('theme') as Mode) || 'light';
        setMode(newMode);
      }
    };

    // Listen for changes in local storage to synchronize tabs.
    if (isBrowser) {
      window.addEventListener('storage', handleStorageChange);

      // Cleanup listener on component unmount.
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [mode]);

  // Function to toggle between 'light' and 'dark' modes.
  const toggleHandler = (): void => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Return the current mode and the toggle function.
  return { mode, toggle: toggleHandler };
};

export default useDarkMode;
