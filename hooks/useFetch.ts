import { useEffect, useState } from 'react'

/**
 * Custom hook for making HTTP requests using the Fetch API.
 * @param url - The URL for the HTTP request.
 * @param enabled - Flag indicating whether the request should be executed.
 * @returns An object containing the fetched data, error state, loading state, and a refresh function.
 */
const useFetch = <T = any>(url: string, enabled: boolean = true) => {
  // State to store the fetched data.
  const [data, setData] = useState<T | null>(null)

  // States for handling error and loading states.
  const [isError, setIsError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // State to store the error message if an error occurs.
  const [error, setError] = useState<string | null>(null)

  /**
   * Function to fetch data from the specified URL.
   */
  const fetchData = async () => {
    if (enabled) {
      try {
        // Set loading state to true before making the request.
        setLoading(true)
        // Reset error states.
        setIsError(false)
        setError(null)

        // Make the HTTP request using the Fetch API.
        const res = await fetch(url)
        const result = await res.json()

        // Check if the request was successful (HTTP status in the 2xx range).
        if (res.ok) {
          setIsError(false)
          // Update the data state with the fetched data.
          setData(() => result.data)
        } else {
          // If the request was not successful, set error states and throw an error.
          setIsError(true)
          throw new Error(`HTTP Error! status: ${result.status}`)
        }
      } catch (err: any) {
        // Handle errors that may occur during the fetch operation.
        setIsError(true)
        setError(err.message)
      } finally {
        // Set loading state to false after the request is complete.
        setLoading(false)
      }
    }
  }

  // Use useEffect to trigger the fetch operation when the URL or the enabled flag changes.
  useEffect(() => {
    fetchData()
  }, [url, enabled])

  // Return an object containing the fetched data, error state, loading state, and the refresh function.
  return { data, isError, error, loading, refresh: fetchData }
}

export default useFetch
