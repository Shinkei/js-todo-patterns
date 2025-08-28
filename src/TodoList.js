import observerMixin from '../mixings/observerMixin.js'
import TodoItem from './TodoItem.js'

class TodoList {
  #data = new Set()

  // SINGLETON PATTERN IMPLEMENTATION
  // =================================
  // Ensures only one instance of TodoList exists throughout the application
  static instance = null

  // Static initialization block - creates the single instance when class is loaded
  static {
    this.instance = new TodoList()
  }

  /**
   * SINGLETON PATTERN: Factory method to get the single instance
   * @returns {TodoList} The singleton instance of TodoList
   */
  static getInstance() {
    return this.instance
  }

  /**
   * SINGLETON PATTERN: Private constructor prevents direct instantiation
   * Forces users to use getInstance() method instead of 'new TodoList()'
   * @throws {Error} Always throws to prevent direct instantiation
   */
  constructor() {
    if (TodoList.instance) {
      throw new Error('Use TodoList.getInstance() to access the list.')
    }
  }
  // =================================

  get items() {
    return this.#data
  }

  add(item) {
    const newItem = new TodoItem(item.text)
    const todoArray = Array.from(this.#data)
    const isTodoPresent = todoArray.some(existingItem =>
      existingItem.equals(newItem)
    )
    if (!isTodoPresent) {
      this.#data.add(newItem)
      this.notify()
    }
  }

  delete(item) {
    const itemToDelete = new TodoItem(item.text)
    const todoArray = Array.from(this.#data)
    const todoItemFound = todoArray.find(existingItem =>
      existingItem.equals(itemToDelete)
    )
    if (todoItemFound) {
      this.#data.delete(todoItemFound)
      this.notify()
    }
  }

  find(item) {
    const todoArray = Array.from(this.#data)
    const todoItemFound = todoArray.find(existingItem =>
      existingItem.equals(item)
    )
    return todoItemFound || null
  }

  replaceList(newList) {
    this.#data = newList
    this.notify()
  }
}

// apply the mixing to the class, this adds observer pattern methods to TodoList like an abstract class
Object.assign(TodoList.prototype, observerMixin)
