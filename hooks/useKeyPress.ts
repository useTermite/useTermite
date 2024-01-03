import { useEffect } from 'react'

// Define a type for the target keys you want to support.
// You can add as many key strings as needed.
type Key = 'Enter' | 'Escape' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

// This hook now accepts targetKey as a value of type Key
const useKeyPress = (targetKey: Key, action: () => void): void => {
  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        action()
      }
    }

    window.addEventListener('keydown', keyPressHandler)

    return () => {
      window.removeEventListener('keydown', keyPressHandler)
    }
  }, [targetKey, action])
}

export default useKeyPress
