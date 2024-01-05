import { useEffect, useRef } from 'react'

// Custom hook to count and log the number of component re-renders.
const useRenderCount = (componentName: string) => {
  // Ref to store the previous render count.
  const renderCountRef = useRef<number>(0)

  // Effect to log the current render count whenever the component re-renders.
  useEffect(() => {
    // Increment the render count.
    renderCountRef.current += 1

    // Log the current render count and component name to the console.
    console.log(`${componentName} has been re-rendered ${renderCountRef.current} times.`)
  })

  // Return the current render count.
  return renderCountRef.current
}

export default useRenderCount
