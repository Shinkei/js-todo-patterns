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
}
