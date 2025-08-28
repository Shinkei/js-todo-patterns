class TodoList {
  #data = new Set()

  get items() {
    return this.#data
  }
}
