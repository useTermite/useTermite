import { useState, useEffect } from 'react'

type OrientationState = 'portrait' | 'landscape'

interface Orientation {
  isPortrait: boolean
  isLandscape: boolean
  state: OrientationState
}

const useOrientation = (): Orientation => {
  const getOrientation = (): OrientationState => {
    // Use type assertion to bypass TypeScript checks for non-standard properties
    const screenOrientation =
      (screen as any).orientation || (screen as any).mozOrientation || (screen as any).msOrientation

    if (screenOrientation?.type.startsWith('portrait')) {
      return 'portrait'
    } else {
      return 'landscape'
    }
  }

  const [orientation, setOrientation] = useState<OrientationState>(getOrientation())

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(getOrientation())
    }

    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  const isPortrait = orientation === 'portrait'
  const isLandscape = orientation === 'landscape'

  return { isPortrait, isLandscape, state: orientation }
}

export default useOrientation
