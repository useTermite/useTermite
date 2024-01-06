import { useState, useEffect } from 'react'

interface NetworkState {
  isOnline: boolean
  state: 'online' | 'offline'
}

const useNetworkState = (): NetworkState => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isOnline: navigator.onLine,
    state: navigator.onLine ? 'online' : 'offline'
  })

  useEffect(() => {
    const goOnline = () => setNetworkState({ isOnline: true, state: 'online' })
    const goOffline = () => setNetworkState({ isOnline: false, state: 'offline' })

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return networkState
}

export default useNetworkState
