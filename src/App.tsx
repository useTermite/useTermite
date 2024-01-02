import { useState } from 'react'
import useIsFirstRender from './hooks/useIsFirstRender'
import useOrientation from './hooks/useOrientation'

const App = () => {
  const [state, setState] = useState(10)
  const isFirstRender = useIsFirstRender()
  const { isLandscape, isPortrait, state: orientation } = useOrientation()
  console.log(isLandscape, isPortrait)
  return (
    <div>
      App {isFirstRender ? 'yes' : 'no'} - {orientation}
      <button onClick={() => setState(pre => pre + 1)}>click {state}</button>
      <ul>
        <li>landscape: {isLandscape && 'OK'}</li>
        <li>portrait: {isPortrait && 'OK'}</li>
      </ul>
    </div>
  )
}

export default App
