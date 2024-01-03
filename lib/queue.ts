class Queue {
  queue: any[]

  constructor(intialValue: any[] = []) {
    this.queue = [...intialValue] || []
  }

  // ? enqueue: means adding one item to the back using append method of linkedList
  enqueue<T>(value: T): void {
    this.queue.push(value)
  }

  // ? dequeue: means removing one item from the start(front) using shift method of linkedList.
  dequeue() {
    this.queue.shift()
  }

  toArray(): any[] {
    return [...this.queue]
  }
}

export default Queue
