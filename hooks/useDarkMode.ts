import { useEffect, useState } from 'react'

// Define the structure of the returned object from the hook.
interface DarkModeHook {
  mode: string // Represents the current mode ('light' or 'dark').
  toggle: () => void // Function to toggle between light and dark modes.
}

// Custom hook for managing dark and light modes.
const useDarkMode = (): DarkModeHook => {
  // Function to get the initial mode from local storage or default to 'light'.
  const getInitialMode = (): string => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      return savedMode ? JSON.parse(savedMode) : 'light'
    }
    return 'light'
  }

  // State to keep track of the current mode.
  const [mode, setMode] = useState<string>(getInitialMode)

  // Function to toggle between light and dark modes.
  const toggle = (): void => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  // Effect to update the HTML element's classList based on the current mode.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(mode)
    }
  }, [mode])

  // Return the current mode and the toggle function.
  return { mode, toggle }
}

export default useDarkMode
