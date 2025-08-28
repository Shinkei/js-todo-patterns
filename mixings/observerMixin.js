// this a mixing that implements the observer pattern

// I expect that each observer is a function
const observerMixin = {
  observers: new Set(),
  addObserver(observer) {
    this.observers.add(observer)
  },
  removeObserver(observer) {
    this.observers.delete(observer)
  },
  notify() {
    this.observers.forEach(observer => observer())
  },
}
