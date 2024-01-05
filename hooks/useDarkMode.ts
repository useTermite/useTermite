import { useEffect, useState } from 'react'

// Define the possible modes as 'dark' or 'light'.
type Mode = 'dark' | 'light'

// Define the structure of the object returned by the useDarkMode hook.
interface DarkModeHook {
  mode: Mode // The current theme mode.
  toggle: () => void // Function to toggle the theme mode.
}

/**
 * Get the initial theme mode from system preferences or local storage,
 * defaults to 'light' if none is found.
 * @returns {Mode} - The initial theme mode.
 */
const getInitialMode = (): Mode => {
  // Check for system preference for dark mode.
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  // Retrieve the theme from local storage if available.
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    return storedTheme as Mode
  } else {
    return prefersDark ? 'dark' : 'light' // Default to system preference or 'light'.
  }
}

/**
 * Custom hook for managing and persisting a theme mode across the application.
 * @returns {DarkModeHook} - The current mode and a function to toggle the mode.
 */
const useDarkMode = (): DarkModeHook => {
  // State to keep track of the current mode.
  const [mode, setMode] = useState<Mode>('light')

  // Effect to initialize the mode.
  useEffect(() => {
    // Get the initial mode only once when the component mounts.
    const initialMode = typeof window !== 'undefined' ? getInitialMode() : 'light'
    setMode(initialMode)
  }, [])

  // Effect to update the HTML element and local storage whenever the mode changes.
  useEffect(() => {
    /**
     * Update the mode in local storage and the document's class list.
     * @param {Mode} newMode - The new mode to be set.
     */
    const updateMode = (newMode: Mode) => {
      const classList = document.documentElement.classList
      // Update the class list on the HTML element.
      newMode === 'dark' ? classList.add('dark') : classList.remove('dark')
      // Persist the new mode in local storage.
      localStorage.setItem('theme', newMode)
    }

    // Apply the mode update.
    updateMode(mode)

    // Synchronize mode across tabs.
    const handleStorageChange = () => {
      const newMode = (localStorage.getItem('theme') as Mode) || 'light'
      setMode(newMode)
    }

    // Listen for changes in local storage to synchronize tabs.
    window.addEventListener('storage', handleStorageChange)

    // Cleanup listener on component unmount.
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [mode])

  // Function to toggle between 'light' and 'dark' modes.
  const toggle = (): void => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
  }

  // Return the current mode and the toggle function.
  return { mode, toggle }
}

export default useDarkMode
