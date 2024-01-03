type ListNode<T> = {
  value: T
  next: ListNode<T> | null
}

class LinkedList<T> {
  private head: ListNode<T> | null
  private tail: ListNode<T> | null

  constructor() {
    this.head = null
    this.tail = null
  }

  append(value: T): void {
    const newElement: ListNode<T> = {
      value,
      next: null
    }

    if (this.tail) {
      this.tail.next = newElement
    }
    this.tail = newElement

    if (!this.head) {
      this.head = newElement
    }
  }

  prepend(value: T): void {
    const newElement: ListNode<T> = {
      value,
      next: this.head
    }

    this.head = newElement

    if (!this.tail) {
      this.tail = newElement
    }
  }

  find(value: T): ListNode<T> | null {
    if (!this.head) {
      return null
    }

    let currentElement = this.head

    while (currentElement) {
      if (currentElement.value === value) {
        return currentElement
      }

      currentElement = currentElement.next!
    }

    return null
  }

  insertAfter(value: T, afterValue: T): void {
    const existingElement = this.find(afterValue)
    if (existingElement) {
      const newElement: ListNode<T> = {
        value,
        next: existingElement.next
      }
      existingElement.next = newElement
    } else {
      console.error('the element has not found in list.')
    }
  }

  delete(value: T): void {
    if (!this.head) {
      return
    }

    while (this.head && this.head.value === value) {
      this.head = this.head.next
    }

    let currentElement = this.head
    while (currentElement && currentElement.next) {
      if (currentElement.next.value === value) {
        currentElement.next = currentElement.next.next
      } else {
        currentElement = currentElement.next
      }
    }

    if (this.tail && this.tail.value === value) {
      this.tail = currentElement
    }
  }

  shift(): void {
    if (!this.head) {
      return
    }

    this.head = this.head.next

    if (!this.head) {
      this.tail = null
    }
  }

  pop(): T | null {
    if (!this.head) {
      return null
    }

    let currentElement = this.head
    let prevElement: ListNode<T> | null = null

    while (currentElement.next) {
      prevElement = currentElement
      currentElement = currentElement.next
    }

    if (prevElement) {
      prevElement.next = null
      this.tail = prevElement
    } else {
      this.head = null
      this.tail = null
    }

    return currentElement.value
  }

  clear(): void {
    this.head = null
    this.tail = null
  }

  toArray(): T[] {
    const elements: T[] = []
    let currElement = this.head
    while (currElement) {
      elements.push(currElement.value)
      currElement = currElement.next
    }
    return elements
  }
}

export default LinkedList
