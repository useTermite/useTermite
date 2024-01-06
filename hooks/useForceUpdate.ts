import { useState } from 'react'

// * types
type UseForceUpdateReturn = [Function, boolean]

const useForceUpdate = (): UseForceUpdateReturn => {
  const [_, setState] = useState<boolean>(true)

  const forceUpdate = () => setState(prev => !prev)

  // * note that the state is only supposed to be used inside of the
  // * dependency array of a useEffect or such and the function is what
  // * we mostly use that's why it's exported as the first element
  return [forceUpdate, _]
}

export default useForceUpdate
