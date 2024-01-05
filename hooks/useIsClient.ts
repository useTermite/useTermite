import { useState, useEffect } from 'react'

const useIsClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false) //A boolean value indicating whether the code is running in a client environment where the window object is available.

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsClient(true) //Set to true to check if the code is running in a client environment
    else setIsClient(false)
  }, [])

  return isClient
}

export default useIsClient
