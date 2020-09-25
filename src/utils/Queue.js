export default class Queue {
  data = []

  constructor(initialData = []) {
    this.data = initialData
  }

  isEmpity() {
    return this.data.length === 0
  }

  enqueue(item) {
    this.data.push(item)
  }

  dequeue() {
    if (!this.isEmpity()) {
      return this.data.shift()
    }
    return false
  }

  clear() {
    this.data.length = 0
  }
}
