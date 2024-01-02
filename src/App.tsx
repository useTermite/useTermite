import { useRef } from 'react'
import useClickOutside from './hooks/useClickOutside'

const App = () => {
  const buttonRef = useRef(null)

  useClickOutside(buttonRef, () => {
    console.log('clicked outside!')
  })

  return (
    <div>
      <button ref={buttonRef}> the button</button>
    </div>
  )
}

export default App
