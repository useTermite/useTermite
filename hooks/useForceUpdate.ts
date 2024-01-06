import { useState } from 'react'

const useForceUpdate = (): Function => {
  const [_, setState] = useState<boolean>(true)

  const forceUpdate = () => setState(prev => !prev)

  return forceUpdate
}

export default useForceUpdate
