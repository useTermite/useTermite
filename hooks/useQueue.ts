import { useState, useEffect } from 'react'
import Queue from '../lib/queue'

const queueList = new Queue()
const useQueue = (intialValue: any[] = []) => {
  const [queue, setQueue] = useState([...intialValue] || [])

  const setQueueToState = () => {
    setQueue(queueList.toArray())
  }

  useEffect(() => {
    if (intialValue.length) {
      intialValue?.forEach(item => {
        queueList.enqueue(item)
      })
      setQueueToState()
    }
  }, [])

  const enqueue = <T>(value: T) => {
    queueList.enqueue(value)
    setQueueToState()
  }

  const dequeue = () => {
    queueList.dequeue()
    setQueueToState()
  }

  return { queue, enqueue, dequeue, size: queue.length }
}

export default useQueue
