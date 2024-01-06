import { useState, useEffect } from 'react'
import Queue from '../lib/queue'

// A custom React hook that provides queue functionality.
// This hook manages the state of a queue and provides methods to enqueue and dequeue items.
const queueList = new Queue()
const useQueue = (initialValue: any[] = []) => {
  // State to keep track of the queue's items.
  const [queue, setQueue] = useState([...initialValue] || [])

  // Function to update the React state with the current items in the queue.
  const setQueueToState = () => {
    setQueue(queueList.toArray())
  }

  // Using useEffect to initialize the queue with any initial values provided.
  // This effect runs only once when the component mounts.
  useEffect(() => {
    if (initialValue.length) {
      // Add each initial value to the queue.
      initialValue?.forEach(item => {
        queueList.enqueue(item)
      })
      // Update the React state to reflect the initial queue.
      setQueueToState()
    }
    // The empty dependency array ensures this effect runs only on mount.
  }, [])

  // A method to add an item to the end of the queue.
  // Generic type <T> allows enqueue to work with any data type.
  const enqueue = <T>(value: T) => {
    queueList.enqueue(value)
    // Update the React state to reflect the new queue.
    setQueueToState()
  }

  // A method to remove the first item from the queue.
  const dequeue = () => {
    queueList.dequeue()
    // Update the React state to reflect the new queue.
    setQueueToState()
  }

  // Returns the current state of the queue and the methods to interact with it.
  return {
    queue, // The current state of the queue.
    enqueue, // Method to add an item to the queue.
    dequeue, // Method to remove the first item from the queue.
    size: queue.length // The current number of items in the queue.
  }
}

export default useQueue
