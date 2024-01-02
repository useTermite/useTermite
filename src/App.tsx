import { useState } from 'react'
import useIsFirstRender from './hooks/useIsFirstRender'

const App = () => {
  const [state, setState] = useState(10)
  const isFirstRender = useIsFirstRender()
  return (
    <div>
      App {isFirstRender ? 'yes' : 'no'}
      <button onClick={() => setState(pre => pre + 1)}>click {state}</button>
    </div>
  )
}

export default App
