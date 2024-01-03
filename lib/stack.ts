export default class Stack {
  items: any[]
  constructor() {
    this.items = [] // Initialize an empty array to hold the stack elements
  }

  // Add an item to the top of the stack
  push<T>(element: T) {
    this.items.push(element)
  }

  // Remove and return the top item from the stack
  pop() {
    if (this.items.length === 0) return 'Underflow' // Return a message if the stack is empty
    return this.items.pop()
  }

  // View the top item of the stack without removing it
  peek() {
    return this.items[this.items.length - 1]
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0
  }

  // Clear all items from the stack
  clear() {
    this.items = []
  }

  // Print the elements of the stack
  printStack() {
    let str = ''
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + ' '
    }
    return str.trim()
  }
}
