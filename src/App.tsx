import { useState } from 'react'
import useKeyPress from './hooks/useKeyPress'
const App = () => {
  const [show, setShow] = useState(true)

  useKeyPress('Escape', () => {
    setShow(false)
  })

  useKeyPress('Enter', () => {
    setShow(true)
  })

  if (show) return <div>App</div>
}

export default App
