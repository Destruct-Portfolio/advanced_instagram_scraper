export default class Queue<T> {
  constructor(public elements: Array<T>) {}
  // this adds ele to the back of the queue
  enqueue(ele: T): void {
    this.elements.push(ele)
  }

  // remove the first element of an array
  dequeue(): T | undefined {
    return this.elements.shift()
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.elements.length === 0
  }

  // Get the length of the queue
  length(): number {
    return this.elements.length
  }

}

