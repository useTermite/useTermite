import { useEffect, useState } from 'react'

export const useIsClient = () => {
  const [isClient, setIsClient] = useState<Boolean>(false)

  useEffect(() => {
    setIsClient(true) // Set to true after component mounts in the client

    return () => {
      setIsClient(false) // Set to false if component is unmounted
    }
  }, [])

  return isClient
}
